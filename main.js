'use strict';
(function(app) {
	document.addEventListener('DOMContentLoaded', function() {
		oa.core.enableProdMode();
		oa.platformBrowserDynamic
			.platformBrowserDynamic()
			.bootstrapModule(app.AppModule);
	});
})(window.app || (window.app = {}));
