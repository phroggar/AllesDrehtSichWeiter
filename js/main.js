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
   2. INITIALISATION ENTRY POINT
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
