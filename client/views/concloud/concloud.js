Template.concloud.rendered = function () {

	jqueryui();
  metroNotifications();

	 WebFontConfig = {
    google: { families: [ 'Lato:400,700,900,400italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
     $('body').removeAttr('style');

};