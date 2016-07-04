(function(app) {
	app.HTTPService = (function() {
		var HTTPService = function(http) {
			this.http = http;
		};
		HTTPService.parameters = [
			ng.http.Http
		];
		HTTPService.prototype.get = function(reqId, url, o, p) {
			return this.http
				.get(url + '?o=' + o + '&p=' + p, {
					"cache":   false,
					"headers": {
						"X-ReqId":           reqId
					}
				})
				.map(function(response) {
					var h_reqId   = response.headers.get('X-ReqId') || response.headers.get('x-reqid'),
					    h_rtt     = response.headers.get('X-Angular-Time') || response.headers.get('x-angular-time'),
					    is_cached = (response.headers.get('x-cache-status') || response.headers.get('X-Cache-Status')) === 'HIT';
					return {
						"json":   response.json() || {},
						"reqId":  parseInt(h_reqId),
						"rtt":    parseInt(h_rtt),
						"tsn":    is_cached ? 0.1 : (parseFloat(response.headers.get('x-nginx-time') || response.headers.get('X-nginX-Time')) * 1000.0) | 0,
						"exts":   is_cached ? 0 : parseFloat(response.headers.get('x-node-time') || response.headers.get('X-Node-Time')),
						"red":    is_cached ? 0 : parseFloat(response.headers.get('x-redis-time') || response.headers.get('X-Redis-Time')),
						"cached": is_cached
					};
				})
				.catch();
		};
		HTTPService.prototype.post = function(url, body) {
			return this.http
				.post(url + '?time=' + Date.now(), body, {
					"cache":   false,
					"headers": {
						"Cache-Control":     'no-cache, no-store, must-revalidate',
						"If-Modified-Since": 'Mon, 26 Jul 1997 05:00:00 GMT',
						"Pragma":            'no-cache'
					}
				})
				.map(function(response) {
					return response.json() || {};
				})
				.catch();
		};
		return HTTPService;
	})();
})(window.app || (window.app = {}));
