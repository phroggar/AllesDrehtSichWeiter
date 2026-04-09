/**
 * ============================================================
 * Alles dreht sich weiter — main.js
 * ============================================================
 * Vanilla JavaScript. No frameworks. No build step.
 * ============================================================
 */

/* ============================================================
   1. UTILITY HELPERS
   Small, reusable functions used throughout the file.
   ============================================================ */

/**
 * Shorthand for document.querySelector.
 * Returns the first matching element, or null if not found.
 *
 * @param {string} selector - CSS selector string
 * @param {Element|Document} [context=document] - Optional root to search within
 * @returns {Element|null}
 */
const qs = (selector, context = document) => context.querySelector(selector);

/**
 * Add an event listener and return a cleanup function.
 *
 * @param {EventTarget} target  - Element or window/document
 * @param {string}      event   - Event name, e.g. 'click'
 * @param {Function}    handler - Callback function
 * @param {object}      [opts]  - addEventListener options
 * @returns {Function}          - Call to remove the listener
 */
const on = (target, event, handler, opts) => {
  target.addEventListener(event, handler, opts);
  return () => target.removeEventListener(event, handler, opts);
};

/* ============================================================
   2. INSTALL PROMPT
   Handles the PWA installation flow.
   ============================================================ */

let deferredPrompt;

/**
 * Initialise the installation prompt logic.
 * Listens for the beforeinstallprompt event.
 */
function initInstallPrompt() {
  const prompt = qs('#install-prompt');
  const btnInstall = qs('#install-button');
  const btnClose = qs('#install-close');

  if (!prompt || !btnInstall || !btnClose) return;

  // Catch the browser's install prompt event
  on(window, 'beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show our custom prompt
    prompt.classList.remove('hidden');
  });

  // Handle the install button click
  on(btnInstall, 'click', async () => {
    if (!deferredPrompt) return;

    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User choice: ${outcome}`);

    // We've used the prompt, so we can't use it again
    deferredPrompt = null;
    // Hide our prompt
    prompt.classList.add('hidden');
  });

  // Handle the close button click
  on(btnClose, 'click', () => {
    prompt.classList.add('hidden');
  });

  // Optional: Hide prompt if app is already installed
  on(window, 'appinstalled', (event) => {
    console.log('[PWA] App installed successfully');
    prompt.classList.add('hidden');
    deferredPrompt = null;
  });
}

/* ============================================================
   3. INITIALISATION ENTRY POINT
   All feature modules are called from here.
   ============================================================ */

/**
 * Main initialisation function.
 * Called once the DOM is fully loaded.
 */
function init() {
  const video = qs('#main-video');
  if (video) {
    console.log('[App] Video player initialised.');
  }

  initInstallPrompt();

  // Log confirmation in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('[App] Initialised successfully.');
  }
}

/*
  Wait for the DOM to be fully parsed before running init().
*/
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
