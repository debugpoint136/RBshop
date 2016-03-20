Template.Loading.onCreated(function () {
  // if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: '/images/loader.gif',
      backgroundColor: 'white',
      loadingHtml: message + spinner
    });
  // Session.set('loadingSplash', true); // just show loading splash once
  //}
});


Template.Loading.onRendered(function () {
  if ( this.loading ) {
    this.loading.finish();
  }
});

var message = '<p class="loading-message">Loading ...</p>';
var spinner = '<div class="sk-stretchdelay"></div>';

// sk-spinner sk-spinner-rotating-plane