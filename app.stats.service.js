"use strict";
(function(app) {
    app.StatsService = (function() {
        var StatsService = function(RefData) {
            this._s_PI = RefData._s_PI;
            this._s_STG = ['-redis',
                           '-node',
                           '-nginx',
                           '-angular'];
            this._s_HURL = '/hdr';
        };
        StatsService.parameters = [
            app.RefDataService
        ];
        //// startStatistics
        sSt: function(t, rqEx, dur, cnEr, rq, rs, cc, cn) {
            t.clc = true;
            t.dur = dur;
            t.rqEx = rqEx;
            t.rER = cnEr;
            t.rs = rs;
            t.chRe = cc;
            setTimeout(function() {
                var aR = t.cH(t, rqEx, dur, rq, cn);
                t.bcd = aR[0];
                t.pcd = aR[1];
                t.pcd2 = aR[2];
                t.tpA = aR[3];
                t.tpX = aR[4];
                t.tpN = aR[5];
                t.tpR = aR[6];
                t.hg = aR[7];
                t.tReq = aR[8];
            });
        },
        //// calculateHistogram
        cH: function(t, rqEx, dur, rq, cn) {
            t.lE = false;
            //// resetChartsData
            var cBC = function(k1, k2) {
                    return {
                        key: k1 + k2,
                        values: []
                    };
                },
                cPC = function(k) {
                    return {
                        key: k,
                        y: 0
                    };
                },
                bcd = [],
                pcd = [cPC(this._s_PI[0]),
                       cPC(this._s_PI[1]),
                       cPC(this._s_PI[2]),
                       cPC(this._s_PI[3])],
                pcd2 = [cPC(this._s_PI[0]),
                        cPC(this._s_PI[1]),
                        cPC(this._s_PI[2]),
                        cPC(this._s_PI[3])],
                lcd = [
                    {
                        key: 'w/o Coord. Omission',
                        values: [],
                        area: false
                    },
                    {
                        key: 'Latency/Percentile',
                        values: [],
                        area: true
                    }
                ],
                dr = ((rqEx * 0.0455) | 0) + 1,
                dLo = (dr / 2) | 0,
                dUp = rqEx - dLo,
                setBcd = function(i, l, v) {
                    bcd[i].values.push({
                                           label: l,
                                           value: v
                                       });
                },
                rq0 = rq[0],
                rq1 = rq[0].slice(0),
                rq2 = rq[0].slice(0),
                rq3 = rq[0].slice(0),
                toA = 0,
                toX = 0,
                toN = 0,
                toR = 0,
                hg = [[50,
                       0,
                       0,
                       0,
                       0],
                    [75,
                     0,
                     0,
                     0,
                     0],
                    [87.5,
                     0,
                     0,
                     0,
                     0],
                    [93.75,
                     0,
                     0,
                     0,
                     0],
                    [96.875,
                     0,
                     0,
                     0,
                     0],
                    [98.4375,
                     0,
                     0,
                     0,
                     0],
                    [99.21875,
                     0,
                     0,
                     0,
                     0],
                    [100,
                     0,
                     0,
                     0,
                     0]],
                totReqAng = [0,
                             0,
                             0,
                             0],
                totReqNgi = [0,
                             0,
                             0,
                             0],
                hdPD = {arr: []},
                byH = function(hl, hv, v) {
                    return hl === hv ? v : 0;
                },
                inSD = function(i, v) {
                    return ((i >= dLo) && (i <= dUp)) ? v : 0;
                },
                inSDbyH = function(hl, hv, i, v) {
                    return ((hl === hv) && (i >= dLo) && (i <= dUp)) ? v : 0;
                }, rtt = [], tsn = [], exts = [], red = [];
            //
            // Populate barchart structure
            //
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    bcd.push(cBC(this._s_PI[j], this._s_STG[i]));
                }
            }
            //
            // Populate barchart as processed (no sorting)
            //
            for (i = 0; i < rqEx; i++) {
                var _hst = rq0[i].H,
                    _rid = rq0[i].Q;
                rtt = [0,
                       0,
                       0,
                       0];
                tsn = [0,
                       0,
                       0,
                       0];
                exts = [0,
                        0,
                        0,
                        0];
                red = [0,
                       0,
                       0,
                       0];
                rtt[_hst] = rq0[i].A;
                tsn[_hst] = rq0[i].X;
                exts[_hst] = rq0[i].N;
                red[_hst] = rq0[i].R;
                for (var j = 0; j < 4; j++) {
                    setBcd(j, _rid, red[j] | 0);
                    setBcd(j + 4, _rid, (exts[j] - red[j]) | 0);
                    setBcd(j + 8, _rid, (tsn[j] - exts[j]) | 0);
                    setBcd(j + 12, _rid, rtt[j] - tsn[j]);
                }
                hdPD.arr.push(rq0[i].A);
            }
            //
            // Prepare histogram
            //
            rq0.sort(function(a, b) {return a.A - b.A});
            rq1.sort(function(a, b) {return a.X - b.X});
            rq2.sort(function(a, b) {return a.N - b.N});
            rq3.sort(function(a, b) {return a.R - b.R});
            for (i = 0; i < rqEx; i++) {
                var _hstR = rq0[i].H,
                    _rttR = rq0[i].A,
                    _hstT = rq1[i].H,
                    _tsnT = rq1[i].X;
                for (j = 0; j < 4; j++) {
                    rtt[j] = byH(_hstR, j, _rttR);
                    pcd2[j].y += inSD(i, rtt[j]);
                    totReqAng[j] += inSDbyH(_hstR, j, i, 1);
                    tsn[j] = byH(_hstT, j, _tsnT);
                    pcd[j].y += inSD(i, tsn[j]);
                    totReqNgi[j] += inSDbyH(_hstT, j, i, 1);
                }
                toA += inSD(i, _rttR);
                toX += inSD(i, _tsnT);
                toN += inSD(i, rq2[i].N);
                toR += inSD(i, rq3[i].R);
            }
            for (i = 0; i < 4; i++) {
                pcd2[i].y /= totReqAng[i];
                pcd[i].y /= totReqNgi[i];
            }
            var tpA = ((rqEx / (dur / 1000)) | 0) + 1,
                tpX = ((tpA * toA / toX) | 0) + 1,
                tpN = ((tpX * toX / toN) | 0) + 1,
                tpR = ((tpN * toN / toR) | 0) + 1;
            for (i = 0; i < hg.length; i++) {
                var ix = ((rqEx * hg[i][0] / 100) | 0) - 1;
                hg[i][1] = rq0[ix].A;
                hg[i][2] = rq1[ix].X;
                hg[i][3] = rq2[ix].N;
                hg[i][4] = rq3[ix].R;
            }
            //
            // Prepare threaded requests
            //
            var quebra = 12,
                tReq = [],
                numTH = ((cn / quebra) | 0) + 1,
                cnTH = numTH < cn ? numTH : cn;
            for (i = 0; i < cnTH; i++) {
                tReq.push([]);
                var lim = (i + 1) * quebra;
                if (lim > cn) { lim = cn; }
                for (j = i * quebra; j < lim; j++) {
                    tReq[i].push([]);
                }
            }
            for (i = 0; i < rqEx; i++) {
                var th1 = (rq[3][i] / quebra) | 0, th2 = rq[3][i] % quebra;
                tReq[th1][th2].push(i);
            }
            //
            // Calculating HDR Histogram
            //
            var oRT = t.hS.post(this._s_HURL, JSON.stringify(hdPD)).subscribe(
                function(re) {
                    for (var n = 0; n < re.chart.length; n++) {
                        var idx = ((re.chart[n].percentile * t.rOK / 100) | 0) - 1;
                        lcd[0].values.push({
                                               x: re.chart[n].percentile,
                                               y: re.chart[n].value
                                           });
                        lcd[1].values.push({
                                               x: re.chart[n].percentile,
                                               y: rq0[(idx < 0) ? 0 : idx].A
                                           });
                    }
                },
                function(e) {
                },
                function() {
                    t.lcd = lcd;
                    oRT.unsubscribe();
                    t.clc = false;
                    t.run = false;
                    t.lE = false;
                }
            );
            //
            // Set Angular view variables
            //
            this.sGA(this._s_SIM, 'E', 'T', tpA);
            return [bcd,
                    pcd,
                    pcd2,
                    tpA,
                    tpX,
                    tpN,
                    tpR,
                    hg,
                    tReq];
        },
        return StatsService;
    })();
})(window.app || (window.app = {}));
