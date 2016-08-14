"use strict";
(function(app) {
    app.LiveRedisService = function() {
        this._o_SIO = io(window.location.protocol + '//' + window.location.hostname + ':33331', {autoConnect: false});
        this._e_SIO = undefined;
        //// Create Live Events matrix
        this.cLE = function() {
            var lva = [], a0 = [], a01 = [], a1 = [], a12 = [], a2 = [];
            for (var i = 0; i < 32; i++) {
                a0[i] = 0;
                a01[i] = i < 11 ? 0 : 1;
                a1[i] = 1;
                a12[i] = i < 22 ? 1 : 2;
                a2[i] = 2;
            }
            for (i = 0; i < 5; i++) {
                lva.push(a0.slice(0));
            }
            lva.push(a01);
            for (i = 0; i < 4; i++) {
                lva.push(a1.slice(0));
            }
            lva.push(a12);
            for (i = 0; i < 5; i++) {
                lva.push(a2.slice(0));
            }
            return lva;
        };
        //// deactivateLiveEvents
        this.dLE = function() {
            if (this._e_SIO) {
                this._e_SIO.destroy();
                if (this._o_SIO.connected) {
                    this._o_SIO.close();
                }
            }
        };
        //// activateLiveEvents
        this.aLE = function(m) {
            this._o_SIO.connect();
            this._e_SIO = this._o_SIO.on('redis', function(d) {
                if (m[d.x][d.y] < 3) {
                    var x = d.x,
                        y = d.y;
                    m[x][y] = 3;
                    setTimeout(function() {
                        m[x][y] = ((((x << 5) + y) << 4) / 2731) | 0;
                    }, 750);
                }
            });
        };
    };
})(window.app || (window.app = {}));
