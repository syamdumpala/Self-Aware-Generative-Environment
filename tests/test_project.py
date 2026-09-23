from __future__ import annotations

import json
import sys
import threading
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


@pytest.fixture()
def server():
    import server as sage_server

    httpd = ThreadingHTTPServer(("127.0.0.1", 0), sage_server.SageRequestHandler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    yield httpd
    httpd.shutdown()
    thread.join(timeout=2)
    httpd.server_close()


def request(server, path, method="GET"):
    url = f"http://127.0.0.1:{server.server_port}{path}"
    request = urllib.request.Request(url, method=method)
    return urllib.request.urlopen(request)


def test_release_assets_are_served_with_security_headers(server):
    response = request(server, "/index.html")

    assert response.status == 200
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "no-referrer"
    assert "connect-src 'none'" in response.headers["Content-Security-Policy"]


def test_repository_files_are_not_browsable(server):
    for path in ("/README.md", "/docs/ARCHITECTURE.md", "/server.py", "/tests/test_project.py"):
        with pytest.raises(urllib.error.HTTPError) as error:
            request(server, path)
        assert error.value.code == 404


def test_path_traversal_is_rejected(server):
    for path in ("/../README.md", "/%2e%2e/README.md", "/index.html/../README.md"):
        with pytest.raises(urllib.error.HTTPError) as error:
            request(server, path)
        assert error.value.code == 404


def test_unsupported_method_is_rejected(server):
    with pytest.raises(urllib.error.HTTPError) as error:
        request(server, "/index.html", method="POST")
    assert error.value.code == 405


def test_ui_contains_privacy_and_intent_contract():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    javascript = (ROOT / "app.js").read_text(encoding="utf-8")

    assert "Content-Security-Policy" in html
    assert 'id="privacy-dialog"' in html
    assert 'id="focus-shield"' in html
    assert 'id="export-capsule"' in html
    assert "localStorage.setItem('sage-consent'" in javascript
    assert "Intent staged from local evidence." in javascript
    assert "sage-context-capsule/v1" in javascript
    assert "focusShieldEnabled" in javascript


def test_consent_payload_is_json_serializable():
    consent = {"camera": True, "microphone": False, "screen": True, "retention": True}
    assert json.loads(json.dumps(consent)) == consent
