const simulateButton = document.querySelector('#simulate');
const stageButton = document.querySelector('#stage');
const dismissButton = document.querySelector('#dismiss');
const clearMemoryButton = document.querySelector('#clear-memory');
const privacyButton = document.querySelector('#privacy');
const focusShieldButton = document.querySelector('#focus-shield');
const exportCapsuleButton = document.querySelector('#export-capsule');
const settingsButton = document.querySelector('#settings');
const privacyDialog = document.querySelector('#privacy-dialog');
const closePrivacyButton = document.querySelector('#close-privacy');
const savePrivacyButton = document.querySelector('#save-privacy');
const toast = document.querySelector('#toast');
const intentCard = document.querySelector('#intent-card');
const intentTitle = document.querySelector('#intent-title');
const intentBody = document.querySelector('#intent-body');

let toastTimer;
let focusShieldEnabled = false;
const consentKeys = ['camera', 'microphone', 'screen', 'retention'];

function readConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem('sage-consent') || '{}');
    consentKeys.forEach((key) => {
      const control = document.querySelector(`#consent-${key}`);
      if (typeof stored[key] === 'boolean') control.checked = stored[key];
    });
  } catch {
    showToast('Privacy preferences could not be restored. Defaults remain active.');
  }
}

function openPrivacy() {
  if (typeof privacyDialog.showModal === 'function') privacyDialog.showModal();
  else privacyDialog.setAttribute('open', '');
}

readConsent();
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

simulateButton.addEventListener('click', () => {
  if (focusShieldEnabled) {
    showToast('Focus shield is active. SAGE is staying quiet.');
    return;
  }
  intentCard.animate([{ transform: 'translateY(8px)', opacity: .35 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
  intentTitle.textContent = 'Open the variance notebook';
  intentBody.textContent = 'The current trace is the strongest unresolved signal. SAGE can stage the notebook beside your benchmark notes, locally.';
  simulateButton.innerHTML = '<span>✓</span> Intent resolved';
  showToast('Intent staged from local evidence.');
});

stageButton.addEventListener('click', () => showToast('Workspace staged. Nothing was opened without approval.'));
dismissButton.addEventListener('click', () => { intentCard.style.opacity = '.48'; showToast('Suggestion dismissed for this session.'); });
clearMemoryButton.addEventListener('click', () => showToast('This episodic thread was cleared from local memory.'));
focusShieldButton.addEventListener('click', () => {
  focusShieldEnabled = !focusShieldEnabled;
  focusShieldButton.setAttribute('aria-pressed', String(focusShieldEnabled));
  focusShieldButton.classList.toggle('shield-enabled', focusShieldEnabled);
  showToast(focusShieldEnabled ? 'Focus shield active. Suggestions are paused.' : 'Focus shield off. SAGE can observe intent again.');
});
exportCapsuleButton.addEventListener('click', () => {
  const capsule = {
    format: 'sage-context-capsule/v1',
    createdAt: new Date().toISOString(),
    retention: 'user-controlled',
    signals: ['research workspace active', 'unresolved marker', 'battery trace on display'],
    predictedIntent: 'review battery benchmark notes',
    confidence: 0.92,
  };
  const blob = new Blob([JSON.stringify(capsule, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'sage-context-capsule.json';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Context capsule exported locally.');
});
privacyButton.addEventListener('click', openPrivacy);
settingsButton.addEventListener('click', openPrivacy);
closePrivacyButton.addEventListener('click', () => privacyDialog.close());
savePrivacyButton.addEventListener('click', () => {
  const consent = Object.fromEntries(consentKeys.map((key) => [key, document.querySelector(`#consent-${key}`).checked]));
  localStorage.setItem('sage-consent', JSON.stringify(consent));
  privacyDialog.close();
  showToast('Privacy controls saved locally.');
});

document.querySelectorAll('.rail-button[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.rail-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector(`#${button.dataset.view}-view`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
