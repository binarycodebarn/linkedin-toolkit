import { ACTIONS } from './utils/actions.js';
import { convertToSalesNavigatorURL } from './utils/url-converter.js';

const COLUMNS = {
  LINKEDIN_PROFILE: 'Personal Linkedin',
  OUTREACH_MESSAGE: 'Outreach Message',
};

const STATE = {
  currentIndex: 0,
  profiles: [],
  currentTabId: null,
};

function initializeState() {
  chrome.storage.local.set({
    currentIndex: 0,
    profiles: [],
  });
}

// Initialize state when extension is installed
chrome.runtime.onInstalled.addListener(initializeState);

// All the message.action are coming from the content script and popup.js and we are handling them here
chrome.runtime.onMessage.addListener(async (message) => {
  try {
    switch (message.action) {
      case ACTIONS.POPUP_ACTIONS.START_OUTREACH:
        // Reset state and start processing
        STATE.profiles = message.profiles || [];
        STATE.currentIndex = 0;

        if (STATE.profiles.length > 0) {
          await processNextProfile();
        }
        break;

      case ACTIONS.BACKGROUND_ACTIONS.PROFILE_PROCESSED:
        // Process next profile if available
        if (STATE.currentIndex < STATE.profiles.length) {
          await processNextProfile();
        }
        break;

      default:
        console.log('Unknown action received:', message.action);
        break;
    }
  } catch (error) {
    console.error('Background worker error:', error);
  }
  return false; // Required for async message handling
});

async function processNextProfile() {
  if (STATE.currentIndex >= STATE.profiles.length) {
    return;
  }

  const profile = STATE.profiles[STATE.currentIndex];

  try {
    const tab = await chrome.tabs.create({
      url: convertToSalesNavigatorURL(profile[COLUMNS.LINKEDIN_PROFILE]),
      active: true,
    });

    await chrome.storage.local.set({
      currentProfile: profile,
      currentTabId: tab.id,
      currentIndex: STATE.currentIndex,
    });

    STATE.currentTabId = tab.id;
    STATE.currentIndex++;
  } catch (error) {
    console.error('Error processing profile:', error);
  }
}

// Listen for tab updates, this will send a message to the content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === STATE.currentTabId && changeInfo.status === 'complete') {
    // Tab has finished loading
    const currentProfile = STATE.profiles[STATE.currentIndex - 1];

    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, {
      action: ACTIONS.BACKGROUND_ACTIONS.PROFILE_READY,
      profile: {
        ...currentProfile,
        linkedinOutreach: currentProfile[COLUMNS.OUTREACH_MESSAGE],
      },
    });
  }
});
