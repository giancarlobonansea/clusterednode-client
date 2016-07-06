'use strict';
(function(app) {
	document.addEventListener('DOMContentLoaded', function() {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.bootstrap(app.AppSimulator, [ng.http.HTTP_PROVIDERS,
		                                                       ng.platformBrowser.DomSanitizationService]);
	});
})(window.app || (window.app = {}));
