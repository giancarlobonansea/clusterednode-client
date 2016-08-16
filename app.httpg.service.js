'use strict';
(function(app) {
	app.HTTPServiceG = (function() {
		var HTTPServiceG = function(http) {
			this.http = http;
		};
		HTTPServiceG.parameters = [
			ng.http.Http
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
					var c = re.headers.get('x-cache-status') === 'HIT';
					return {
						"json": re.json() || {},
						// "Q":    parseInt(re.headers.get('x-reqid')),
						// "A":    parseInt(re.headers.get('x-angular-time')),
						// "X":    c ? 0.5 : parseFloat(re.headers.get('x-nginx-time') * 1000.0) | 0,
						// "N":    c ? 0 : parseFloat(re.headers.get('x-node-time')),
						// "R":    c ? 0 : parseFloat(re.headers.get('x-redis-time')),
						"Q":    re.headers.get('x-reqid'),
						"A":    re.headers.get('x-angular-time') | 0,
						"X":    c ? 0.5 : (re.headers.get('x-nginx-time') * 1000.0) | 0,
						"N":    c ? 0 : re.headers.get('x-node-time'),
						"R":    c ? 0 : re.headers.get('x-redis-time'),
						"C":    c
					};
				})
				.catch();
		};
		return HTTPServiceG;
	})();
})(window.app || (window.app = {}));
