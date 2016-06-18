(function(app) {
	app.HTTPService = (function() {
		var HTTPService = function(http) {
			this.http = http;
		};
		HTTPService.parameters = [
			ng.http.Http
		];
		HTTPService.prototype.get = function(reqId, url) {
			return this.http
				.get(url + '?reqid=' + reqId, {
					"cache":   false,
					"headers": {
						"Cache-Control":     'no-cache, no-store, must-revalidate',
						"If-Modified-Since": 'Mon, 26 Jul 1997 05:00:00 GMT',
						"Pragma":            'no-cache',
						"X-ReqId":           reqId
					}
				})
				.map(function(response) {
					return {
						"json":  response.json() || {},
						"reqId": parseInt(response.headers.get('X-ReqId')||response.headers.get('x-reqid')),
						"rtt":   parseInt(response.headers.get('X-Angular-Time')||response.headers.get('x-angular-time')),
						"tsn":   parseInt(parseFloat(response.headers.get('X-nginX-Time')||response.headers.get('x-nginx-time')) * 1000.0),
						"exts":  parseFloat(response.headers.get('X-Node-Time')||response.headers.get('x-node-time'))
					};
				})
				.catch();
		};
		return HTTPService;
	})();
})(window.app || (window.app = {}));
