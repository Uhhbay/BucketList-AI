// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const updateMessage = document.getElementById('update-message');
    const viewWebsiteButton = document.getElementById('view-website');
    const frequencySelect = document.getElementById('frequency-select');

    // Check for updates in Chrome storage
    chrome.storage.local.get('hasUpdates', (result) => {
        if (result.hasUpdates) {
            updateMessage.textContent = 'There are new updates!';
            viewWebsiteButton.style.display = 'block';
        } else {
            updateMessage.textContent = 'No new flight updates at the moment.';
        }
    });

    // Open the flight updates website on button click
    viewWebsiteButton.addEventListener('click', () => {
        chrome.tabs.create({ url: 'http://localhost:3000/dashboard' }); // Replace with your site URL
    });

    // Load the saved frequency preference
    chrome.storage.local.get('frequency', (result) => {
        if (result.frequency) {
            frequencySelect.value = result.frequency;
        }
    });

    // Save the selected frequency to Chrome storage
    frequencySelect.addEventListener('change', (e) => {
        const newFrequency = e.target.value;
        chrome.storage.local.set({ frequency: newFrequency });
    });
});
