// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const updateMessage = document.getElementById('update-message');
    const viewWebsiteButton = document.getElementById('view-website');

    // Check Chrome storage for updates
    chrome.storage.local.get('hasUpdates', (result) => {
        if (result.hasUpdates) {
            updateMessage.textContent = 'New flight updates are available!';
            viewWebsiteButton.style.display = 'block';
        } else {
            updateMessage.textContent = 'No new flight updates at the moment.';
        }
    });

    // Open the flight updates website when the button is clicked
    viewWebsiteButton.addEventListener('click', () => {
        chrome.tabs.create({ url: 'http://localhost:3001' }); // Replace with your site URL
    });
});
