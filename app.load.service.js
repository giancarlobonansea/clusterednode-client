"use strict";
(function(app) {
    app.LoadService = (function() {
        var LoadService = function(RefData, HTTPServiceG, StatsService) {
            this.hS = HTTPServiceG;
            this.stS = StatsService;
            this._s_PI = RefData._s_PI;
            this._s_AURL = '/api';
            this._j_ERE = {
                //rtt = A
                A: 0,
                //hst = H
                H: '',
                //rid = Q
                Q: 0,
                //tsn = X
                X: 0,
                //exts = N
                N: 0,
                //erd = R
                R: 0,
                //cached = C
                C: false
            };
            this._a_OPE = [0,
                           0,
                           0,
                           0,
                           0,
                           0,
                           0,
                           1,
                           2,
                           3];
        };
        LoadService.parameters = [
            app.RefDataService,
            app.HTTPServiceG,
            app.StatsService
        ];
        //// [ok] helper functions
        LoadService.prototype.mR = function(v) {
            return (Math.random() * v) | 0;
        };
        //// [ok] resetExecutionScopeVariables
        LoadService.prototype.cRS = function() {
            var j = [];
            for (var i = 0; i < 4; i++) {
                j.push([this._s_PI[i],
                           [],
                        0]);
            }
            return j;
        };
        //// [ok] createPIX
        LoadService.prototype.cPIX = function() {
            var j = {};
            for (var i = 0; i < 4; i++) {
                j[this._s_PI[i]] = [i,
                    {}];
            }
            return j;
        };
        //// observableResponses
        LoadService.prototype.oRD = function(t, re, rs, rq, cc, pix) {
            for (var k = 0; k < re.length; k++) {
                rq[3][re[k].Q] = k;
                this.oRR(t, re[k], rs, rq, cc, pix);
            }
        };
        //// observableResponses1
        LoadService.prototype.oRR = function(t, re, rs, rq, cc, pix) {
            var res = re,
                req = res.Q,
                hst = res.json.h,
                ndx = pix[hst][0],
                cch = res.C;
            rq[0][req] = {
                Q: 'Req ' + ((req | 0) + 1),
                H: ndx,
                A: res.A,
                X: res.X,
                N: res.N,
                R: res.R,
                C: cch
            };
            if (cch) {
                t.rqCh++;
                cc.push(++t.rOK);
            }
            else {
                var pid = res.json.p,
                    o = rq[2][req];
                if (!(pid in pix[hst][1])) {
                    rs[ndx][1].push([pid,
                                        [[],
                                            [],
                                            [],
                                            []]]);
                    pix[hst][1][pid] = rs[ndx][1].length - 1;
                }
                rs[ndx][1][pix[hst][1][pid]][1][o].push(++t.rOK);
                rs[ndx][2]++;
            }
        };
        //// throwHTTP
        LoadService.prototype.tHr = function(tHt, t, tRqCt, tRqCn, tRqDu, tRqIn, rq) {
            var cnRq = 0,
                cnRe = 0,
                cnEr = 0,
                cc = [],
                pix = this.cPIX(),
                rs = this.cRS(),
                iniTime = Date.now(),
                tls = this;
            if (!tHt) {
                // STRESS
                var ev = [],
                    fROK = function(d) {
                        var proReq = cnRq++,
                            eid = d;
                        if (proReq < tRqCt) {
                            rq[3][proReq] = eid;
                            rq[1][proReq].subscribe(
                                function(r) {
                                    tls.oRR(t, r, rs, rq, cc, pix);
                                },
                                function() {
                                    cnEr++;
                                },
                                function() {
                                    if (++cnRe >= tRqCt) {
                                        ev[eid].unsubscribe();
                                        tls.stS.sSt(t, tRqCt, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
                                    }
                                    else {
                                        ev[eid].emit(eid);
                                    }
                                    this.unsubscribe();
                                }
                            );
                        }
                        else {
                            ev[eid].unsubscribe();
                        }
                    };
                for (var e = 0; e < tRqCn; e++) {
                    ev.push(new ng.core.EventEmitter(true));
                    ev[e].subscribe(fROK);
                    ev[e].emit(e);
                }
            }
            else {
                // DURATION
                var tmR = true,
                    sHd = function() {
                        if (inH) {
                            clearInterval(inH);
                        }
                        tls.stS.sSt(t, cnRe, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
                    },
                    inF = function() {
                        if (tmR && cnRq < tRqCt) {
                            cnRq += tRqCn;
                            var oRA = Rx.Observable.forkJoin(rq[1].slice(cnRq - tRqCn, cnRq < tRqCt ? cnRq : tRqCt)).subscribe(
                                function(r) {
                                    tls.oRD(t, r, rs, rq, cc, pix);
                                },
                                function() {
                                    cnEr += tRqCn;
                                },
                                function() {
                                    cnRe += tRqCn;
                                    oRA.unsubscribe();
                                    if (!tmR && !tls.stS.clc && cnRq === cnRe) {
                                        sHd();
                                    }
                                }
                            );
                        }
                        else {
                            if (!tls.stS.clc && cnRq === cnRe) {
                                sHd();
                            }
                        }
                    };
                setTimeout(function() {
                    tmR = false;
                }, (tRqDu * 1000) + 10);
                setTimeout(function() {inF();});
                var inH = setInterval(function() {inF();}, tRqIn);
            }
        };
        //// [ok] populateRequestSamples
        LoadService.prototype.pRS = function(rqCt) {
            var rq = [[],
                    [],
                    [],
                    []],
                oT = [0,
                      0,
                      0,
                      0];
            for (var q = 0; q < rqCt; q++) {
                var o = this._a_OPE[this.mR(10)];
                oT[o]++;
                rq[0].push(this._j_ERE);
                rq[1].push(this.hS.get(q, this._s_AURL, o, this.mR(16384)));
                rq[2].push(o);
                rq[3].push(0);
            }
            return [rq,
                    oT];
        };
        return LoadService;
    })();
})(window.app || (window.app = {}));
