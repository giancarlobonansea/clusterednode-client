'use strict';
(function(app) {
	app.HTTPServiceG = (function() {
		var HTTPServiceG = function(http) {
			this.http = http;
		};
		HTTPServiceG.parameters = [
			app.ng.http.Http
		];
		HTTPServiceG.prototype.get = function(q, u, o, p) {
			return this.http
				.get(u + '?o=' + o + '&p=' + p, {
					"cache":   false,
					"headers": {
						"x-reqid": q
					}
				})
				.map(function(re) {
					var h = re.headers,
						c = h.get('x-cache-status') === 'HIT';
					return {
						"json": re.json() || {},
						"Q":    h.get('x-reqid') | 0,
						"A":    h.get('x-angular-time') | 0,
						"X":    c ? 0.5 : (h.get('x-nginx-time') * 1000) | 0,
						"N":    c ? 0.0 : parseFloat(h.get('x-node-time')),
						"R":    c ? 0.0 : parseFloat(h.get('x-redis-time')),
						"C":    c
					};
				})
				.catch();
		};
		return HTTPServiceG;
	})();
})(window.app || (window.app = {}));
