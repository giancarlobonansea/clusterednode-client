"use strict";
(function(app) {
    app.SimulatorComponent = ng.core
        .Component({
                       selector: 'n-c-s',
                       templateUrl: 'simulator.html',
                       providers: [
                           ng.http.HTTP_PROVIDERS,
                           ng.platformBrowser.BROWSER_SANITIZATION_PROVIDERS,
                           app.HTTPService,
                           app.LiveRedisService,
                           app.LoadService,
                           app.StatsService,
                           app.ChartsService,
                           app.ReferenceService
                       ],
                       directives: [nvD3, ng.common.FORM_DIRECTIVES]
                   })
        .Class({
                   //
                   // Configuration & Initialization methods
                   //
                   //// resetViewExecVariables
                   rVEV: function() {
                       this.rER = 0;
                       this.rOK = 0;
                       this.rqCh = 0;
                       this.clc = false;
                       this.tReq = [];
                       this.rlS.rVEV();
                       this.leS.rVEV();
                   },
                   //
                   // UI related methods
                   //
                   //// [ok] Google Analytics
                   sGA: function(a, b, c, d) {
                       ga('send', 'event', a, b, c, d);
                   },
                   //// [ok] setMethodParameters
                   sMP: function(p) {
                       var m = this.iD ? 0 : 1;
                       this.rqCt = this._a_PRE[p][m][0];
                       this.rqDu = this._a_PRE[p][m][1];
                       this.rqIn = this._a_PRE[p][m][2];
                       this.rqCn = this._a_PRE[p][m][3];
                       this.sGA(this._s_SIM, this._s_CFG, this._a_PRE[p][2], 0);
                   },
                   //// [ok] setDuration or setRequests
                   sD: function(m) {
                       this.iD = m;
                       this.sMP(0);
                   },
                   //// [ok] getSimulationMethod
                   gSM: function() {
                       return this.iD ? this._s_STA : this._s_STR;
                   },
                   //// [ok] onRefLinkClick
                   oRLC: function(t, d) {
                       this.sGA('R', t, d, 0);
                   },
                   //// [ok] showRef
                   shR: function() {
                       if (this.rlS.toggleRE()) {
                           this.leS.lE = false;
                           this.leS.dLE();
                       }
                   },
                   //// [ok] showLive
                   shL: function() {
                       if (this.leS.toggleLE()) {
                           this.leS.aLE();
                           this.rlS.sRe = false;
                       }
                       else {
                           this.leS.dLE();
                       }
                   },
                   //// [ok] percValue
                   pV: function(o, c) {
                       return (o * 100 / c) | 0;
                   },
                   //// [ok] calcPosition
                   cPo: function(o, h) {
                       return (o * h / 100) | 0;
                   },
                   //// [ok] getDurationRequests
                   gDR: function(d, c, i) {
                       var tot = (d * 1000 * c / i) | 0;
                       return tot - (tot % c);
                   },
                   //// [ok] getDurationThroughput
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
                   //// Component constructor
                   constructor: [app.HTTPService,
                                 app.LiveRedisService,
                                 app.LoadService,
                                 app.StatsService,
                                 app.ChartsService,
                                 app.ReferenceService,
                                 function(HTTPService, LRService, LOService, STService, CTService, RLService) {
                       //// Constants
                       this._s_SIM = 'S';
                       this._s_CFG = 'C';
                       this._s_STA = 'STABILITY';
                       this._s_STR = 'STRESS';
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
                       //
                       // Google Analytics setup
                       //
                       ga('create', 'UA-79558369-1', 'auto');
                       ga('send', 'pageview');
                       //
                       // Initialize services
                       //
                       this.hS = HTTPService;
                       this.leS = LRService;
                       this.loS = LOService;
                       this.stS = STService;
                       this.ctS = CTService;
                       this.rlS = RLService;
                       //
                       // View execution parameters
                       //
                       this.sD(false);
                       //
                       // View presentation variables - reference links
                       //
                       this.links = this.rlS.iRL();
                       //
                       // View execution variables
                       //
                       this.rVEV();
                       this.run = false;
                   }]
               });
})(window.app || (window.app = {}));
