const isIos = () => {
   const userAgent = window.navigator.userAgent.toLowerCase();
   return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
   //this.setState({ showInstallMessage: true });
   // alert('Ios!');
   const appInfoWrapper = document.querySelector('.app-info');
   appInfoWrapper.classList.remove('hidden');
   const installAppWrapper = document.querySelector('#installAppWrap');
   installAppWrapper.classList.remove('hidden');
   const appInfoClose = document.querySelector('.app-info__close');
   appInfoClose.addEventListener('click', () => {
      appInfoWrapper.classList.add('hidden');
   })
   const installAppButton = document.getElementById('installAppButton');
   installAppButton.addEventListener('click', () => {
      appInfoWrapper.classList.remove('hidden');
   })
} else {
   let deferredPrompt;
   const addBtn = document.querySelector('#installAppButton');

   window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      const installAppWrapper = document.querySelector('#installAppWrap');
      installAppWrapper.classList.remove('hidden');
      addBtn.addEventListener('click', (e) => {
         // hide our user interface that shows our A2HS button
         // addBtn.style.display = 'none';
         // Show the prompt
         deferredPrompt.prompt();
         // Wait for the user to respond to the prompt
         deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
               console.log('User accepted the A2HS prompt');
               const installAppWrapper = document.querySelector('#installAppWrap');
               installAppWrapper.classList.remove('hidden');
            } else {
               console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
         });
      });
   });
}