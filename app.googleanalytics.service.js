"use strict";
(function(app) {
    app.GAService = (function() {
        var GAService = function() {

        };
        GAService.prototype.sGA = function(a, b, c, d) {
            ga('send', 'event', a, b, c, d);
        };
        GAService.prototype.setup = function() {
            //
            // Google Analytics setup
            //
            ga('create', 'UA-79558369-1', 'auto');
            ga('send', 'pageview');
        };
        return GAService;
    })();
})(window.app || (window.app = {}));
