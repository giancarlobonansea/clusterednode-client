'use strict';
(function(app) {
	app.HTTPServiceP = (function() {
		var HTTPServiceP = function(http) {
			this.http = http;
		};
		HTTPServiceP.parameters = [
			global.ng.http.Http
		];
		HTTPServiceP.prototype.post = function(u, b) {
			return this.http
				.post(u + '?time=' + Date.now(), b, {
					"cache":   false,
					"headers": {
						"Cache-Control":     'no-cache, no-store, must-revalidate',
						"If-Modified-Since": 'Mon, 26 Jul 1997 05:00:00 GMT',
						"Pragma":            'no-cache'
					}
				})
				.map(function(re) {
					return re.json() || {};
				})
				.catch();
		};
		return HTTPServiceP;
	})();
})(window.app || (window.app = {}));
