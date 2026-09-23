"""Minimal hardened local server for the SAGE static release candidate."""
from __future__ import annotations

import mimetypes
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
ALLOWED_FILES = {"index.html", "styles.css", "app.js"}
SECURITY_HEADERS = {
    "Content-Security-Policy": "default-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none';",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
}


class SageRequestHandler(SimpleHTTPRequestHandler):
    """Serve only the release assets; never expose the repository directory."""

    server_version = "SAGE/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        for name, value in SECURITY_HEADERS.items():
            self.send_header(name, value)
        super().end_headers()

    def _requested_asset(self) -> Path | None:
        path = unquote(urlsplit(self.path).path).lstrip("/")
        if not path or "/" in path or "\\" in path or path not in ALLOWED_FILES:
            return None
        candidate = (ROOT / path).resolve()
        if candidate.parent != ROOT or not candidate.is_file():
            return None
        return candidate

    def do_GET(self) -> None:
        if self._requested_asset() is None:
            self.send_error(HTTPStatus.NOT_FOUND, "Asset not found")
            return
        super().do_GET()

    def do_HEAD(self) -> None:
        if self._requested_asset() is None:
            self.send_error(HTTPStatus.NOT_FOUND, "Asset not found")
            return
        super().do_HEAD()

    def do_POST(self) -> None:
        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "SAGE is a static local surface")

    def log_message(self, format: str, *args) -> None:
        return


def run(host: str = "127.0.0.1", port: int = 8765) -> None:
    server = ThreadingHTTPServer((host, port), SageRequestHandler)
    print(f"SAGE local runtime: http://{host}:{port}/index.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    run()
