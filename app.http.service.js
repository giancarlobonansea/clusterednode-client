'use strict';
(function(app) {
	app.HTTPService = (function() {
		var HTTPService = function(http) {
			this.http = http;
		};
		HTTPService.parameters = [
			ng.http.Http
		];
		HTTPService.prototype.get = function(q, u, o, p) {
			return this.http
				.get(u + '?o=' + o + '&p=' + p, {
					"cache":   false,
					"headers": {
						"x-reqid": q
					}
				})
				.map(function(re) {
					var c = re.headers.get('x-cache-status') === 'HIT';
					return {
						"json": re.json() || {},
						"Q":    parseInt(re.headers.get('x-reqid')),
						"A":    parseInt(re.headers.get('x-angular-time')),
						"X":    c ? 0.5 : parseFloat(re.headers.get('x-nginx-time') * 1000.0) | 0,
						"N":    c ? 0 : parseFloat(re.headers.get('x-node-time')),
						"R":    c ? 0 : parseFloat(re.headers.get('x-redis-time')),
						"C":    c
					};
				})
				.catch();
		};
		HTTPService.prototype.post = function(u, b) {
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
		return HTTPService;
	})();
})(window.app || (window.app = {}));
