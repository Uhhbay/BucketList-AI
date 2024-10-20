// background.js

const API_URL = 'http://localhost:3001/api/flights/updates'; // Replace with your API

// Function to check for flight updates
async function checkForUpdates() {
    try {
        const response = await fetch(API_URL, { credentials: 'include' });

        if (response.ok) {
            const data = await response.json();

            // If there are new updates, store them in Chrome storage
            if (data.newFlightsAvailable) {
                chrome.storage.local.set({ hasUpdates: true });

                // Show a notification to alert the user
                chrome.notifications.create('flight-alert', {
                    type: 'basic',
                    iconUrl: 'icons/icon128.png',
                    title: 'New Flight Update!',
                    message: 'There are new flights based on your bucket list!',
                    priority: 2,
                });
            } else {
                chrome.storage.local.set({ hasUpdates: false });
            }
        } else {
            console.error('Failed to fetch flight updates.');
        }
    } catch (error) {
        console.error('Error fetching flight updates:', error);
    }
}

// Set an alarm to run the update check every 24 hours
chrome.alarms.create('checkForUpdates', { periodInMinutes: 1440 });

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkForUpdates') {
        checkForUpdates();
    }
});
