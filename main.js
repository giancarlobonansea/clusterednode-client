'use strict';
(function(app) {
	document.addEventListener('DOMContentLoaded', function() {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.bootstrap(app.AppSimulator, [ng.http.HTTP_PROVIDERS,
		                                                       DomSanitizationService]);
	});
})(window.app || (window.app = {}));
