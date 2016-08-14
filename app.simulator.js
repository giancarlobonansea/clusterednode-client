(function(app) {
    app.AppSimulator = ng.core
        .Component({
                       selector: 'n-c-s',
                       templateUrl: 'simulator.html',
                       providers: [
                           app.HTTPService,
                           ng.http.HTTP_PROVIDERS,
                           ng.platformBrowser.BROWSER_SANITIZATION_PROVIDERS,
                           app.LiveRedisService
                       ],
                       directives: [nvD3, ng.common.FORM_DIRECTIVES]
                   })
        .Class({
                   //// helper functions
                   iRL: function(t) {
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
                   mR: function(v) {
                       return (Math.random() * v) | 0;
                   },
                   //// Google Analytics
                   sGA: function(a, b, c, d) {
                       ga('send', 'event', a, b, c, d);
                   },
                   //// initCharts
                   cP: function(t) {
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
                   cRS: function() {
                       var j = [];
                       for (var i = 0; i < 4; i++) {
                           j.push([this._s_PI[i],
                                      [],
                                   0]);
                       }
                       return j;
                   },
                   //// createPIX
                   cPIX: function() {
                       var j = {};
                       for (var i = 0; i < 4; i++) {
                           j[this._s_PI[i]] = [i,
                               {}];
                       }
                       return j;
                   },
                   //// observableResponses
                   oR: function(t, re, rs, rq, cc, pix) {
                       for (var k = 0; k < re.length; k++) {
                           rq[3][re[k].Q] = k;
                           this.oR1(t, re[k], rs, rq, cc, pix);
                       }
                   },
                   oR1: function(t, re, rs, rq, cc, pix) {
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
                   //// throwHTTP
                   tHr: function(tHt, t, tRqCt, tRqCn, tRqDu, tRqIn, rq, tClc) {
                       var cnRq = 0,
                           cnRe = 0,
                           cnEr = 0,
                           cc = [],
                           pix = this.cPIX(),
                           rs = this.cRS(),
                           iniTime = Date.now();
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
                                               t.oR1(t, r, rs, rq, cc, pix);
                                           },
                                           function() {
                                               cnEr++;
                                           },
                                           function() {
                                               if (++cnRe >= tRqCt) {
                                                   ev[eid].unsubscribe();
                                                   t.sSt(t, tRqCt, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
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
                                   t.sSt(t, cnRe, Date.now() - iniTime, cnEr, rq, rs, cc, tRqCn);
                               },
                               inF = function() {
                                   if (tmR && cnRq < tRqCt) {
                                       cnRq += tRqCn;
                                       var oRA = Rx.Observable.forkJoin(rq[1].slice(cnRq - tRqCn, cnRq < tRqCt ? cnRq : tRqCt)).subscribe(
                                           function(r) {
                                               t.oR(t, r, rs, rq, cc, pix);
                                           },
                                           function() {
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
                   pRS: function(t) {
                       var rq = [[],
                               [],
                               [],
                               []],
                           oT = [0,
                                 0,
                                 0,
                                 0];
                       for (var q = 0; q < t.rqCt; q++) {
                           var o = this._a_OPE[this.mR(10)];
                           oT[o]++;
                           rq[0].push(this._j_ERE);
                           rq[1].push(t.hS.get(q, this._s_AURL, o, this.mR(16384)));
                           rq[2].push(o);
                           rq[3].push(0);
                       }
                       return [rq,
                               oT];
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
                       this.sGA(_s_SIM, 'E', 'T', tpA);
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
                   //
                   // Configuration & Initialization methods
                   //
                   //// resetViewExecVariables
                   rVEV: function() {
                       this.rER = 0;
                       this.rOK = 0;
                       this.rqCh = 0;
                       this.sRe = false;
                       this.clc = false;
                       this.tReq = [];
                       this.leMx = this.oleMx.slice(0);
                   },
                   //
                   // UI related methods
                   //
                   //// setMethodParameters
                   sMP: function(p) {
                       var m = this.iD ? 0 : 1;
                       this.rqCt = this._a_PRE[p][m][0];
                       this.rqDu = this._a_PRE[p][m][1];
                       this.rqIn = this._a_PRE[p][m][2];
                       this.rqCn = this._a_PRE[p][m][3];
                       this.sGA(this._s_SIM, this._s_CFG, this._a_PRE[p][2], 0);
                   },
                   //// setDuration or setRequests
                   sD: function(m) {
                       this.iD = m;
                       this.sMP(0);
                   },
                   //// getSimulationMethod
                   gSM: function() {
                       return this.iD ? this._s_STA : this._s_STR;
                   },
                   //// onRefLinkClick
                   oRLC: function(t, d) {
                       this.sGA('R', t, d, 0);
                   },
                   //// showRef
                   shR: function() {
                       this.sRe = !this.sRe;
                       if (this.sRe) {
                           this.lE = false;
                           this.leS.dLE();
                       }
                   },
                   //// showLive
                   shL: function() {
                       this.lE = !this.lE;
                       if (this.lE) {
                           this.leS.aLE(this.leMx);
                           this.sRe = false;
                       }
                       else {
                           this.leS.dLE();
                       }
                   },
                   //// percValue
                   pV: function(o, c) {
                       return (o * 100 / c) | 0;
                   },
                   //// calcPosition
                   cPo: function(o, h) {
                       return (o * h / 100) | 0;
                   },
                   //// getDurationRequests
                   gDR: function(d, c, i) {
                       var tot = (d * 1000 * c / i) | 0;
                       return tot - (tot % c);
                   },
                   //// getDurationThroughput
                   gDT: function(d, c, i) {
                       return (this.gDR(d, c, i) / d) | 0;
                   },
                   //
                   // Execution control methods
                   //
                   //// startSimulator
                   sSi: function() {
                       ////
                       //// Initialize execution variables - once for each execution
                       //// all first time initialization performed on constructor function
                       ////
                       //
                       // Save execution parameters & Reset Live Events socket variables
                       //
                       this.exM = this.gSM();
                       this.exiD = this.exM === this._s_STA;
                       this.exR = this.rqCt;
                       this.exD = this.rqDu;
                       this.exI = this.rqIn;
                       this.exC = this.rqCn;
                       this.exmR = this.gDR(this.rqDu, this.rqCn, this.rqIn);
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
                           this.rqCt = this.exmR | 0;
                       }
                       var aR = this.pRS(this);
                       this.oT = aR[1];
                       this.tHr(this.iD, this, this.rqCt, this.rqCn, this.rqDu, this.rqIn, aR[0], this.clc);
                   },
                   safeUrl: function(u) {
                       return this.snS.bypassSecurityTrustResourceUrl(u);
                   },
                   constructor: [app.HTTPService,
                                 ng.platformBrowser.DomSanitizationService,
                                 app.LiveRedisService,
                                 function(HTTPService, DOMSanitizer, LRService) {
                       "use strict";
                       //// Constants
                       this._s_SIM = 'S';
                       this._s_CFG = 'C';
                       this._s_PI = ['raspberrypi2',
                                     'raspberrypi3',
                                     'raspberrypi5',
                                     'raspberrypi6'];
                       this._s_STG = ['-redis',
                                      '-node',
                                      '-nginx',
                                      '-angular'];
                       this._s_AURL = '/api';
                       this._s_HURL = '/hdr';
                       this._s_STA = 'STABILITY';
                       this._s_STR = 'STRESS';
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
                       this._a_PRE = [
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
                       ];
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
                       //
                       // Google Analytics setup
                       //
                       ga('create', 'UA-79558369-1', 'auto');
                       ga('send', 'pageview');
                       //
                       // Initialize services
                       //
                       this.hS = HTTPService;
                       this.snS = DOMSanitizer;
                       this.leS = LRService;
                       //
                       // View execution parameters
                       //
                       this.sD(false);
                       //
                       // View presentation variables - reference links
                       //
                       this.links = this.iRL(this);
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
                       this.pco = this.cP('nginX');
                       this.pco2 = this.cP('AngularJS');
                       //
                       // Live Events socket variables and configuration
                       //
                       this.lE = false;
                       this.gDS = ['text-muted',
                                   'text-primary',
                                   'text-muted',
                                   'text-danger'];
                       this.oleMx = this.leS.cLE();
                       //
                       // View execution variables
                       //
                       this.rVEV();
                       this.run = false;
                   }]
               });
})(window.app || (window.app = {}));
