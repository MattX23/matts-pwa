// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// PWA Install Prompt Handling
let deferredPrompt;
const installBtn = document.getElementById('install-btn');
const installContainer = document.getElementById('install-container');

// Hide button if already installed or not installable
window.addEventListener('appinstalled', () => {
    installBtn.classList.add('hidden');
    console.log('PWA installed successfully');
});

// Capture the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event for later use
    deferredPrompt = e;
    // Show the install button
    installBtn.classList.remove('hidden');
});

// Handle install button click
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log('User response:', outcome);
        // Clear the deferred prompt
        deferredPrompt = null;
        // Hide the install button
        installBtn.classList.add('hidden');
    }
});

// Check if running as installed app
if (window.matchMedia('(display-mode: standalone)').matches) {
    installBtn.classList.add('hidden');
}