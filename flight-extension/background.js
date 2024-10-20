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

// Set an alarm based on the user’s frequency preference
function setAlarm(frequency) {
    let periodInMinutes;

    switch (frequency) {
        case 'daily':
            periodInMinutes = 1440; // 24 hours
            break;
        case 'weekly':
            periodInMinutes = 10080; // 7 days
            break;
        case 'monthly':
            periodInMinutes = 43200; // 30 days
            break;
        case '6-months':
            periodInMinutes = 262800; // 6 months
            break;
        default:
            periodInMinutes = 1440; // Default to 24 hours
    }

    chrome.alarms.create('checkForUpdates', { periodInMinutes });
}

// Listen for changes in frequency settings
chrome.storage.onChanged.addListener((changes) => {
    if (changes.frequency?.newValue) {
        chrome.alarms.clear('checkForUpdates', () => {
            setAlarm(changes.frequency.newValue);
        });
    }
});

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkForUpdates') {
        checkForUpdates();
    }
});