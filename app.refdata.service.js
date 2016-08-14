"use strict";
(function(app) {
    app.RefDataService = (function() {
        var RefDataService = function() {
            this._s_PI = ['raspberrypi2',
                          'raspberrypi3',
                          'raspberrypi5',
                          'raspberrypi6'];
        };
        return RefDataService;
    })();
})(window.app || (window.app = {}));
