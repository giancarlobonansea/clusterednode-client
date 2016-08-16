"use strict";
(function(app) {
    app.GAService = (function() {
        var GAService = function() {
            //
            // Google Analytics setup
            //
            ga('create', 'UA-79558369-1', 'auto');
            ga('send', 'pageview');
        };
        GAService.prototype.sGA = function(a, b, c, d) {
            ga('send', 'event', a, b, c, d);
        };
        return GAService;
    })();
})(window.app || (window.app = {}));
