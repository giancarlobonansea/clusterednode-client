"use strict";
(function(app) {
    app.LiveRedisService = (function() {
        var LiveRedisService = function() {
            //// Create Live Events matrix
            var cLE = function() {
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
            //
            // Live Events socket variables and configuration
            //
            this.gDS = ['text-muted',
                        'text-primary',
                        'text-muted',
                        'text-danger'];
            this.oleMx = cLE();
            //this.o_SIO = io(window.location.protocol + '//' + window.location.hostname + ':33331', {autoConnect: false});
            this.o_SIO = io('https://192.168.69.233:33331', {autoConnect: false});
            this.e_SIO = undefined;
            this.rVEV();
        };
        //// deactivateLiveEvents
        LiveRedisService.prototype.dLE = function() {
            if (this.e_SIO) {
                this.e_SIO.destroy();
                if (this.o_SIO.connected) {
                    this.o_SIO.close();
                }
            }
        };
        //// activateLiveEvents
        LiveRedisService.prototype.aLE = function() {
            var t = this;
            this.o_SIO.connect();
            this.e_SIO = this.o_SIO.on('redis', function(d) {
                if (t.leMx[d.x][d.y] < 3) {
                    var x = d.x,
                        y = d.y;
                    t.leMx[x][y] = 3;
                    setTimeout(function() {
                        t.leMx[x][y] = ((((x << 5) + y) << 4) / 2731) | 0;
                    }, 750);
                }
            });
        };
        //// resetViewExecVariables
        LiveRedisService.prototype.rVEV = function() {
            this.lE = false;
            this.leMx = this.oleMx.slice(0);
        };
        //// toggleLE
        LiveRedisService.prototype.toggleLE = function() {
            this.lE = !this.lE;
            return this.lE;
        };
        //// setLE
        LiveRedisService.prototype.setLE = function(b) {
            this.lE = b;
        };
        return LiveRedisService;
    })();
})(window.app || (window.app = {}));
