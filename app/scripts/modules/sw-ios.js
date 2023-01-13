const isIos = () => {
   const userAgent = window.navigator.userAgent.toLowerCase();
   return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
const installAppWrapper = document.querySelector('#installAppWrap');
// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
   //this.setState({ showInstallMessage: true });
   // alert('Ios!');
   const appInfoWrapper = document.querySelector('.app-info');
   appInfoWrapper.classList.remove('hidden');
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
      installAppWrapper.classList.remove('hidden');
      addBtn.addEventListener('click', async () => {
         // hide our user interface that shows our A2HS button
         // addBtn.style.display = 'none';
         // Show the prompt
         deferredPrompt.prompt();
         // Wait for the user to respond to the prompt
         const { outcome } = await deferredPrompt.userChoice;
         console.log(`User response to the install prompt: ${outcome}`);
         deferredPrompt.userChoice.outcome.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
               console.log('User accepted the A2HS prompt');
               installAppWrapper.classList.add('hidden');
            } else {
               console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
         });
      });
   });
}