(function(app) {
    app.AppSimulator = (function() {
        //// Constants
        var _s_SIM = 'S',
            _s_CFG = 'C',
            _s_PI = ['raspberrypi2','raspberrypi3','raspberrypi5','raspberrypi6'],
            _s_STG = ['-redis','-node','-nginx','-angular'],
            _s_BURL = 'https://giancarlobonansea.homeip.net:3333',
            _s_AURL = _s_BURL + '3/api',
            _s_HURL = _s_BURL + '3/hdr',
            _s_IURL = _s_BURL + '1',
            _s_STA = 'STABILITY',
            _s_STR = 'STRESS',
            _j_ERE = {
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
            },
            _a_PRE = [
                [[0,
                  5,
                  50,
                  4],
                    [100,
                     0,
                     0,
                     2],
                    'Small'],
                [[0,
                  10,
                  30,
                  4],
                    [512,
                     0,
                     0,
                     16],
                    'Medium'],
                [[0,
                  30,
                  25,
                  4],
                    [1024,
                     0,
                     0,
                     64],
                    'Large'],
                [[0,
                  60,
                  25,
                  8],
                    [2048,
                     0,
                     0,
                     128],
                    'Huge']
            ],
            _a_OPE = [0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      2,
                      3],
            _o_SIO = io(_s_IURL,{autoConnect:false}),
            _e_SIO = undefined,
        //// helper functions
            iRL = function(t) {
                var l = {
                    l0: _RL.l0,
                    l1: _RL.l1,
                    v: []
                };
                for (var i = 0; i < _RL.v.length; i++) {
                    l.v.push({
                                 t: _RL.v[i].t,
                                 a: []
                             });
                    for (var j = 0; j < _RL.v[i].a.length; j++) {
                        l.v[i].a.push({
                                          h: t.safeUrl(_RL.v[i].a[j].h),
                                          d: _RL.v[i].a[j].d
                                      });
                    }
                }
                return l;
            },
            mR = function(v) {
                return (Math.random() * v) | 0;
            },
        //// Google Analytics
            sGA = function(a, b, c, d) {
                ga('send', 'event', a, b, c, d);
            },
        //// initCharts
            cP = function(t) {
                return {
                    chart: {
                        type: 'pieChart',
                        height: 299,
                        showLegend: false,
                        donut: true,
                        padAngle: 0.08,
                        cornerRadius: 5,
                        title: t,
                        x: function(d) {return d.key;},
                        y: function(d) {return d.y;},
                        showLabels: true,
                        labelType: function(d) {return d.data.key + ': ' + (d.data.y | 0);},
                        labelsOutside: true,
                        duration: 500
                    }
                }
            },
        //// resetExecutionScopeVariables
            cRS = function() {
                var j = [];
                for(var i=0;i<4;i++) {
                    j.push([_s_PI[i],[],0]);
                }
                return j;
            },
        //// createPIX
            cPIX = function() {
                var j = {};
                for(var i=0;i<4;i++) {
                    j[_s_PI[i]]=[i,{}];
                }
                return j;
            },
        //// deactivateLiveEvents
            dLE = function() {
                if (_e_SIO) {
                    _e_SIO.destroy();
                    if (_o_SIO.connected) {
                        _o_SIO.close();
                    }
                }
            },
        //// activateLiveEvents
            aLE = function(m) {
                _o_SIO.connect();
                _e_SIO = _o_SIO.on('redis', function(d) {
                    if (m[d.x][d.y] < 3) {
                        var x = d.x,
                            y = d.y;
                        m[x][y] = 3;
                        setTimeout(function() {
                            m[x][y] = ((((x << 5) + y) << 4) / 2731) | 0;
                        }, 750);
                    }
                });
            },
        //// observableResponses
            oR = function(t, re, rs, rq, cc, pix) {
                for (var k = 0; k < re.length; k++) {
                    rq[3][re[k].Q] = k;
                    oR1(t, re[k], rs, rq, cc, pix);
                }
            },
            oR1 = function(t, re, rs, rq, cc, pix) {
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
            },
        //// startStatistics
            sSt = function(t, rqEx, dur, cnEr, rq, rs, cc, cn) {
                t.clc = true;
                t.dur = dur;
                t.rqEx = rqEx;
                t.rER = cnEr;
                t.rs = rs;
                t.chRe = cc;
                setTimeout(function(){
                    var aR = cH(t, rqEx, dur, rq, cn);
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
        //// throwHTTP
            tHr = function(tHt, t, tRqCt, tRqCn, tRqDu, tRqIn, rq, tClc) {
                var cnRq = 0,
                    cnRe = 0,
                    cnEr = 0,
                    cc = [],
                    pix = cPIX(),
                    rs = cRS(),
                    iniTime = Date.now();
                if (!tHt) {
                    // STRESS
                    var ev = [],
                        fROK = function(d) {
                            var proReq = cnRq++,
                                eid = d;
                            if (proReq<tRqCt) {
                            	rq[3][proReq] = eid;
                                rq[1][proReq].subscribe(
                                    function(r) {
                                        oR1(t, r, rs, rq, cc, pix);
                                    },
                                    function(e) {
                                        cnEr++;
                                    },
                                    function() {
                                        if (++cnRe >= tRqCt) {
                                            ev[eid].unsubscribe();
                                            sSt(t, tRqCt, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
                                        }
                                        else {
                                            ev[eid].emit(eid);
                                        }
                                        this.unsubscribe();
                                    }
                                );
                            } else {
                                ev[eid].unsubscribe();
                            }
                        };
                    for(var e=0;e<tRqCn;e++) {
                        ev.push(new ng.core.EventEmitter(true));
                        ev[e].subscribe(fROK);
                        ev[e].emit(e);
                    }
                } else {
                    // DURATION
                    var tmR = true,
                        sHd = function() {
                            if (inH) {
                                clearInterval(inH);
                            }
                            sSt(t, cnRe, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
                        },
                        inF = function() {
                            if (tmR && cnRq < tRqCt) {
                                cnRq += tRqCn;
                                var oRA = Rx.Observable.forkJoin(rq[1].slice(cnRq - tRqCn, cnRq<tRqCt?cnRq:tRqCt)).subscribe(
                                    function(r) {
                                        oR(t, r, rs, rq, cc, pix);
                                    },
                                    function(e) {
                                        cnEr += tRqCn;
                                    },
                                    function() {
                                        cnRe += tRqCn;
                                        oRA.unsubscribe();
                                        if (!tmR && !tClc && cnRq === cnRe) {
                                            sHd();
                                        }
                                    }
                                );
                            }
                            else {
                                if (!tClc && cnRq === cnRe) {
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
            },
        //// populateRequestSamples
            pRS = function(t) {
                var rq = [[],
                        [],
                        [],
                        []],
                    oT = [0,
                          0,
                          0,
                          0];
                for (var q = 0; q < t.rqCt; q++) {
                    var o = _a_OPE[mR(10)];
                    oT[o]++;
                    rq[0].push(_j_ERE);
                    rq[1].push(t.hS.get(q, _s_AURL, o, mR(16384)));
                    rq[2].push(o);
                    rq[3].push(0);
                }
                return [rq,
                        oT];
            },
        //// calculateHistogram
            cH = function(t, rqEx, dur, rq, cn) {
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
                    pcd = [cPC(_s_PI[0]),
                           cPC(_s_PI[1]),
                           cPC(_s_PI[2]),
                           cPC(_s_PI[3])],
                    pcd2 = [cPC(_s_PI[0]),
                            cPC(_s_PI[1]),
                            cPC(_s_PI[2]),
                            cPC(_s_PI[3])],
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
                    },rtt = [], tsn = [], exts = [], red = [];
                //
                // Populate barchart structure
                //
                for(var i=0;i<4;i++) {
                    for(var j=0;j<4;j++) {
                        bcd.push(cBC(_s_PI[j], _s_STG[i]));
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
                    numTH = ((cn/quebra)|0)+1,
                    cnTH = numTH<cn?numTH:cn;
                for(i=0; i<cnTH; i++) {
                    tReq.push([]);
                    var lim = (i+1)*quebra;
                    if (lim>cn) { lim=cn; }
                    for(j=i*quebra; j<lim; j++) {
                        tReq[i].push([]);
                    }
                }
                for (i=0; i<rqEx; i++) {
                    var th1 = (rq[3][i]/quebra)|0, th2 = rq[3][i] % quebra;
                    tReq[th1][th2].push(i);
                }
                //
                // Calculating HDR Histogram
                //
                var oRT = t.hS.post(_s_HURL, JSON.stringify(hdPD)).subscribe(
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
                sGA(_s_SIM, 'E', 'T', tpA);
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
        //// Create Live Events matrix
            cLE = function() {
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
        //// Constructor
        function AppSimulator (HTTPService, DOMSanitizer) {
            //
            // Initialize services
            //
            this.hS = HTTPService;
            this.snS = DOMSanitizer;
            //
            // View execution parameters
            //
            this.sD(false);
            //
            // View presentation variables - reference links
            //
            this.links = iRL(this);
            //
            // Charts configuration and initialization
            //
            this.bco = {
                chart: {
                    type: 'multiBarChart',
                    showControls: false,
                    height: 400,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 45
                    },
                    x: function(d) {return d.label;},
                    y: function(d) {return d.value;},
                    clipEdge: true,
                    stacked: true,
                    showXAxis: false,
                    duration: 500,
                    xAxis: {
                        showMaxMin: false
                    },
                    yAxis: {
                        tickFormat: function(d) {
                            return d3.format('d')(d);
                        }
                    }
                }
            };
            this.lco = {
                chart: {
                    type: 'lineWithFocusChart',
                    showControls: false,
                    height: 400,
                    showLegend: true,
                    clipEdge: true,
                    duration: 500,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function(d) { return d.x; },
                    y: function(d) { return d.y; },
                    useInteractiveGuideline: true,
                    xAxis: {
                        axisLabel: 'Percentile (%)'
                    },
                    yAxis: {
                        axisLabel: 'AngularJS Latency (ms)',
                        axisLabelDistance: -10,
                        rotateYLabel: true
                    },
                    brushExtent: [75,
                                  100]
                }
            };
            this.pco = cP('nginX');
            this.pco2 = cP('AngularJS');
            //
            // Live Events socket variables and configuration
            //
            this.lE = false;
            this.gDS = ['text-muted',
                      'text-primary',
                      'text-muted',
                      'text-danger'];
            this.oleMx = cLE();
            //
            // View execution variables
            //
            this.rVEV();
            this.run = false;
            //
            // Google Analytics setup
            //
            ga('create', 'UA-79558369-1', 'auto');
            ga('send', 'pageview');
        }
        AppSimulator.parameters = [
            app.HTTPService,
            ng.platformBrowser.DomSanitizationService
        ];
        AppSimulator.annotations = [
            new ng.core.Component({
                selector: 'n-c-s',
                templateUrl: 'simulator.html',
                providers: [
                    app.HTTPService,
                    ng.http.HTTP_PROVIDERS,
                    ng.platformBrowser.BROWSER_SANITIZATION_PROVIDERS
                ],
                directives: [nvD3]
            })
        ];
        AppSimulator.prototype.safeUrl = function(u) {
            return this.snS.bypassSecurityTrustResourceUrl(u);
        };
        //
        // Configuration & Initialization methods
        //
        //// resetViewExecVariables
        AppSimulator.prototype.rVEV = function() {
            this.rER = 0;
            this.rOK = 0;
            this.rqCh = 0;
            this.sRe = false;
            this.clc = false;
            this.tReq = [];
            this.leMx = this.oleMx.slice(0);
        };
        //
        // UI related methods
        //
        //// setMethodParameters
        AppSimulator.prototype.sMP = function(p) {
            var m = this.iD ? 0 : 1;
            this.rqCt = _a_PRE[p][m][0];
            this.rqDu = _a_PRE[p][m][1];
            this.rqIn = _a_PRE[p][m][2];
            this.rqCn = _a_PRE[p][m][3];
            sGA(_s_SIM, _s_CFG, _a_PRE[p][2], 0);
        };
        //// setDuration or setRequests
        AppSimulator.prototype.sD = function(m) {
            this.iD = m;
            this.sMP(0);
        };
        //// getSimulationMethod
        AppSimulator.prototype.gSM = function() {
            return this.iD ? _s_STA : _s_STR;
        };
        //// onRefLinkClick
        AppSimulator.prototype.oRLC = function(t, d) {
            sGA('R', t, d, 0);
        };
        //// showRef
        AppSimulator.prototype.shR = function() {
            this.sRe = !this.sRe;
            if (this.sRe) {
                this.lE = false;
                dLE();
            }
        };
        //// showLive
        AppSimulator.prototype.shL = function() {
            this.lE = !this.lE;
            if (this.lE) {
                aLE(this.leMx);
                this.sRe = false;
            } else {
                dLE();
            }
        };
        //// percValue
        AppSimulator.prototype.pV = function(o, c) {
            return (o * 100 / c) | 0;
        };
        //// calcPosition
        AppSimulator.prototype.cP = function(o, h) {
            return (o * h / 100) | 0;
        };
        //// getDurationRequests
        AppSimulator.prototype.gDR = function(d, c, i) {
            var tot = (d * 1000 * c / i) | 0;
            return tot - (tot % c);
        };
        //// getDurationThroughput
        AppSimulator.prototype.gDT = function(d, c, i) {
            return (this.gDR(d, c, i) / d) | 0;
        };
        //
        // Execution control methods
        //
        //// startSimulator
        AppSimulator.prototype.sSi = function() {
            ////
            //// Initialize execution variables - once for each execution
            //// all first time initialization performed on constructor function
            ////
            //
            // Save execution parameters & Reset Live Events socket variables
            //
            this.exM = this.gSM();
            this.exiD = this.exM === _s_STA;
            this.exR = this.rqCt;
            this.exD = this.rqDu;
            this.exI = this.rqIn;
            this.exC = this.rqCn;
            this.exmR = this.gDR(this.rqDu,this.rqCn,this.rqIn);
            //
            // Reset execution scope variables
            //
            this.dur = 0;
            //
            // Reset view execution variables
            //
            this.rVEV();
            this.run = true;
            //
            // Reset view presentation variables - control
            //
            this.shL();
            //
            // Switch among simulation methods (stress or duration)
            //
            if (this.iD) {
                this.rqCt = this.exmR|0;
            }
            var aR = pRS(this);
            this.oT = aR[1];
            tHr(this.iD, this, this.rqCt, this.rqCn, this.rqDu, this.rqIn, aR[0], this.clc);
        };
        return AppSimulator;
    })();
})(window.app || (window.app = {}));
