const ACTIONS = {
  // IMPORTANT Copy this as-is from utils/actions.js
  BACKGROUND_ACTIONS: {
    PROFILE_PROCESSED: "profileProcessed",
    PROFILE_READY: "profileReady",
  },
};

class LinkedInProfileHandler {
  constructor() {
    this.currentProfile = null;
    this.initMessageListeners();
  }

  initMessageListeners() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === ACTIONS.BACKGROUND_ACTIONS.PROFILE_READY) {
        this.currentProfile = message.profile;
        this.handleProfile()
          .then(() => sendResponse({ success: true }))
          .catch((error) =>
            sendResponse({ success: false, error: error.message })
          );
        return true; // Keep message channel open
      }
      return false; // No async response needed
    });
  }

  async handleProfile() {
    try {
      await this.waitForPageLoad();
      // We are waiting for 10 seconds before sending the message
      await this.sleep(10 * 1000);
      await this.sendMessage();
      await this.sleep(2000);

      // Need to send a message back to the background, in order to
      // process the next profile
      chrome.runtime.sendMessage({
        action: ACTIONS.BACKGROUND_ACTIONS.PROFILE_PROCESSED,
        success: true,
        profileUrl: window.location.href,
      });
    } catch (error) {
      // Send an error message back to the background to process the next profile
      chrome.runtime.sendMessage({
        action: ACTIONS.BACKGROUND_ACTIONS.PROFILE_PROCESSED,
        success: false,
        error: error.message,
        profileUrl: window.location.href,
      });
    }
  }

  // Wait for the page to be fully loaded
  async waitForPageLoad() {
    return new Promise((resolve) => {
      const checkReadyState = () => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          setTimeout(checkReadyState, 100);
        }
      };
      checkReadyState();
    });
  }

  // Send a message to the current profile
  async sendMessage() {
    // Check if we have the profile data
    if (!this.currentProfile) {
      throw new Error("No profile data available");
    }

    // Find and click the Message button
    const messageBtn = document.querySelector(
      "button[data-anchor-send-inmail]"
    );
    if (!messageBtn) {
      throw new Error("Message button not found");
    }
    messageBtn.click();
    await this.sleep(1000);

    // Find and fill the message textarea
    const subjectEl = document.querySelector('input[aria-label="Subject (required)"]');
    const textareaEl = document.querySelector('textarea[name="message"]');
    if (!subjectEl || !textareaEl) {
      throw new Error("Subject or message textarea not found");
    }

    // Get the full message from the current profile data
    const fullMessage = this.currentProfile.linkedinOutreach || '';
    // Get the message from the current profile data and sanitize it
    const subject = this.sanitizeText(this.getSubject(fullMessage));
    const message = this.sanitizeText(this.getMessage(fullMessage));

    // Fill the subject in the input
    subjectEl.value = subject;
    subjectEl.dispatchEvent(new Event("input", { bubbles: true }));
    // Fill the subject and message in the textarea
    textareaEl.value = message;
    textareaEl.dispatchEvent(new Event("input", { bubbles: true }));

    // Optional: Add auto-send functionality
    // const sendButton = document.querySelector('button[type="submit"]');
    // if (sendButton) {
    //   sendButton.click();
    // }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  random({ min = 1, max = 5 } = {}) {
    return Math.floor(Math.random() * max) + min;
  }

  // Sanitize text by replacing malformed characters
  sanitizeText(text) {
    return text
      .replace(/⬢/g, "'")
      .replace(/'/g, "'")
      .replace(/'/g, "'")
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/–/g, '-')
      .replace(/—/g, '-');
  }

  getSubject(text) {
    const subjectMatch = text.match(/\*\*Subject Line\*\*:\s*(.*?)(?=\n|$)/);
    return subjectMatch ? subjectMatch[1].trim() : "";
  }

  getMessage(text) {
    const messageMatch = text.match(/\*\*Message Body\*\*:\s*\n\n([\s\S]*?)$/);
    return messageMatch ? messageMatch[1].trim() : "";
  }
}

new LinkedInProfileHandler();
