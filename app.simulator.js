(function(app) {
	app.AppSimulator = (function() {
		//// initReferenceLinks
		var iRL = function(t) {
			var l = {
				l0: _RL.l0,
				l1: _RL.l1,
				v:  []
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
		};
		//// Google Analytics
		var sGA = function(a, b, c, d) {
			ga('send', 'event', a, b, c, d);
		};
		//// Constants
		const _s_SIM  = "Simulation",
		      _s_CFG  = "Configuration",
		      _s_PI2  = "raspberrypi2",
		      _s_PI3  = "raspberrypi3",
		      _s_PI5  = "raspberrypi5",
		      _s_PI6  = "raspberrypi6",
		      _s_RED  = "-redis",
		      _s_ANG  = "-angular",
		      _s_NGI  = "-nginx",
		      _s_NOD  = "-node",
		      _s_BURL = "https://giancarlobonansea.homeip.net",
		      _s_AURL = _s_BURL + ':33333/api',
		      _s_HURL = _s_BURL + ':33333/hdr',
		      _s_IURL = _s_BURL + ':33331',
		      _s_STA  = "STABILITY",
		      _s_STR  = "STRESS",
		      _j_ERE  = {
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
		      _a_PRE  = [
			      [[0,
			        5,
			        50,
			        4],
			       [100,
			        0,
			        0,
			        2]],
			      [[0,
			        10,
			        30,
			        4],
			       [512,
			        0,
			        0,
			        16]],
			      [[0,
			        30,
			        25,
			        4],
			       [1024,
			        0,
			        0,
			        64]],
			      [[0,
			        60,
			        25,
			        8],
			       [2048,
			        0,
			        0,
			        128]]
		      ];
		//// Constructor
		function AppSimulator (HTTPService, DOMSanitizer) {
			//
			// Initialize services
			//
			this.hS = HTTPService;
			this.snS = DOMSanitizer;
			//
			// View execution variables
			//
			this.iVEV();
			//
			// View execution parameters
			//
			this.iVEP();
			//
			// View presentation variables - control
			//
			this.iVPCV();
			//
			// View presentation variables - reference links
			//
			this.links = iRL(this);
			//
			// Charts configuration and initialization
			//
			this.iC();
			//
			// Execution scope variables
			//
			this.iESV();
			//
			// Live Events socket variables and configuration
			//
			this.iLE();
		}
		AppSimulator.parameters = [
			app.HTTPService,
			ng.platformBrowser.DomSanitizationService
		];
		AppSimulator.annotations = [
			new ng.core.Component({
				selector:     'node-cluster-simulator',
				templateUrl:  'simulator.html',
				providers:    [
					app.HTTPService,
					ng.http.HTTP_PROVIDERS,
					ng.platformBrowser.DomSanitizationService,
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
		//// initViewExecVariables
		AppSimulator.prototype.iVEV = function() {
			this.rVEV();
			this.running = false;
		};
		//// resetViewExecVariables
		AppSimulator.prototype.rVEV = function() {
			this.rER = 0;
			this.rOK = 0;
		};
		//// initViewExecParameters
		AppSimulator.prototype.iVEP = function() {
			this.iD = false;
			this.rqCn = 2;
			this.rqCt = 100;
			this.rqDu = 5;
			this.rqIn = 50;
		};
		//// initViewPresentationControlVariables
		AppSimulator.prototype.iVPCV = function() {
			this.rVPCV();
			this.lE = false;
		};
		//// resetViewPresentationControlVariables
		AppSimulator.prototype.rVPCV = function() {
			this.hg = [[50,
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
			                   0]];
			this.sRe = false;
			this.clc = false;
			this.oT = [0,
			           0,
			           0,
			           0];
			this.rqCh = 0;
		};
		//// initCharts
		AppSimulator.prototype.iC = function() {
			this.bco = {
				chart: {
					type:         'multiBarChart',
					showControls: false,
					height:       400,
					margin:       {
						top:    20,
						right:  20,
						bottom: 20,
						left:   45
					},
					x:            function(d) {return d.label;},
					y:            function(d) {return d.value;},
					clipEdge:     true,
					stacked:      true,
					showXAxis:    false,
					duration:     500,
					xAxis:        {
						showMaxMin: false
					},
					yAxis:        {
						tickFormat: function(d) {
							return d3.format('d')(d);
						}
					}
				}
			};
			this.lco = {
				chart: {
					type:                    'lineWithFocusChart',
					showControls:            false,
					height:                  400,
					showLegend:              true,
					clipEdge:                true,
					duration:                500,
					margin:                  {
						top:    20,
						right:  20,
						bottom: 40,
						left:   55
					},
					x:                       function(d) { return d.x; },
					y:                       function(d) { return d.y; },
					useInteractiveGuideline: true,
					xAxis:                   {
						axisLabel: 'Percentile (%)'
					},
					yAxis:                   {
						axisLabel:         'AngularJS Latency (ms)',
						axisLabelDistance: -10,
						rotateYLabel:      true
					},
					x2Axis:                  {
					},
					y2Axis:                  {},
					brushExtent:             [75,
					                          100]
				}
			};
			this.pco = {
				chart: {
					type:          'pieChart',
					height:        299,
					showLegend:    false,
					donut:         true,
					padAngle:      0.08,
					cornerRadius:  5,
					title:         'nginX',
					x:             function(d) {return d.key;},
					y:             function(d) {return d.y;},
					showLabels:    true,
					labelType:     function(d) {return d.data.key + ': ' + (d.data.y | 0);},
					labelsOutside: true,
					duration:      500
				}
			};
			this.pco2 = {
				chart: {
					type:          'pieChart',
					height:        299,
					showLegend:    false,
					donut:         true,
					padAngle:      0.08,
					cornerRadius:  5,
					title:         'AngularJS',
					x:             function(d) {return d.key;},
					y:             function(d) {return d.y;},
					showLabels:    true,
					labelsOutside: true,
					labelType:     function(d) {return d.data.key + ': ' + (d.data.y | 0);},
					duration:      500
				}
			};
			this.rCD();
		};
		//// resetChartsData
		AppSimulator.prototype.rCD = function() {
			this.bcd = [{
				key:    _s_PI2 + _s_RED,
				values: []
			},
			            {
				            key:             _s_PI3 + _s_RED,
				                     values: []
			                     },
			            {
				            key:             _s_PI5 + _s_RED,
				                     values: []
			                     },
			            {
				            key:             _s_PI6 + _s_RED,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI2 + _s_NOD,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI3 + _s_NOD,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI5 + _s_NOD,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI6 + _s_NOD,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI2 + _s_NGI,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI3 + _s_NGI,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI5 + _s_NGI,
				                     values: []
			                     },
			                     {
				                     key:    _s_PI6 + _s_NGI,
				                     values: []
			                     },
			            {
				            key:             _s_PI2 + _s_ANG,
				                     values: []
			                     },
			            {
				            key:             _s_PI3 + _s_ANG,
				                     values: []
			                     },
			            {
				            key:             _s_PI5 + _s_ANG,
				                     values: []
			                     },
			            {
				            key:             _s_PI6 + _s_ANG,
				                     values: []
			                     }];
			this.pcd = [{
				key: _s_PI2,
				y:   0
			},
			            {
				            key:          _s_PI3,
				                       y: 0
			                       },
			            {
				            key:          _s_PI5,
				                       y: 0
			                       },
			            {
				            key:          _s_PI6,
				                       y: 0
			                       }];
			this.pcd2 = [{
				key: _s_PI2,
				y:   0
			},
			             {
				             key:          _s_PI3,
				                        y: 0
			                        },
			             {
				             key:          _s_PI5,
				                        y: 0
			                        },
			             {
				             key:          _s_PI6,
				                        y: 0
			                        }];
			this.lcd = [
				{
					key:    'w/o Coord. Omission',
					values: [],
					area:   false
				},
				{
					key:    'Latency/Percentile',
					values: [],
					area:   true
				}
			];
		};
		//// initExecutionScopeVariables
		AppSimulator.prototype.iESV = function() {
			this.oP = [0,
			           0,
			           0,
			           0,
			           0,
			           0,
			           0,
			           1,
			           2,
			           3];
			this.dur = 0;
		};
		//// resetExecutionScopeVariables
		AppSimulator.prototype.rESV = function() {
			this.dur = 0;
			this.rq = [[],
			           [],
			           []];
			this.rs = [[_s_PI2,
			            []],
			           [_s_PI3,
			            []],
			           [_s_PI5,
			            []],
			           [_s_PI6,
			            []]];
			this.nix = JSON.parse('{"' + _s_PI2 + '":[0,0],"' + _s_PI3 + '":[1,0],"' + _s_PI5 + '":[2,0],"' + _s_PI6 + '":[3,0]}');
			this.pix = JSON.parse('{"' + _s_PI2 + '":{},"' + _s_PI3 + '":{},"' + _s_PI5 + '":{},"' + _s_PI6 + '":{}}');
			this.chRe = [];
		};
		//// saveExecutionParametersCopy
		AppSimulator.prototype.sEPC = function() {
			this.exM = this.gSM();
			this.exR = this.rqCt;
			this.exD = this.rqDu;
			this.exI = this.rqIn;
			this.exC = this.rqCn;
			this.exmR = this.gDR();
		};
		//// resetLiveEventsMatrix
		AppSimulator.prototype.rLEM = function() {
			this.leMx = [];
			for (var i = 0; i < 5; i++) {
				this.leMx.push([0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0,
				                0]);
			}
			this.leMx.push([0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                0,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1]);
			for (i = 0; i < 4; i++) {
				this.leMx.push([1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1,
				                1]);
			}
			this.leMx.push([1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                1,
			                2,
			                2,
			                2,
			                2,
			                2,
			                2,
			                2,
			                2,
			                2,
			                2]);
			for (i = 0; i < 5; i++) {
				this.leMx.push([2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2,
				                2]);
			}
		};
		//// initLiveEvents
		AppSimulator.prototype.iLE = function() {
			this.rLEM();
			var self = this;
			io(_s_IURL).on('redis', function(d) {
				if (self.leMx[d.x][d.y] !== 3) {
					var x = d.x,
					    y = d.y;
					self.leMx[x][y] = 3;
					setTimeout(function() {
						self.leMx[x][y] = ((((x << 5) + y) << 4) / 2731) | 0;
					}, 1000);
				}
			});
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
		};
		//// setSmall
		AppSimulator.prototype.sS = function() {
			this.sMP(0);
			sGA(_s_SIM, _s_CFG, 'Small', 0);
		};
		//// setMedium
		AppSimulator.prototype.sM = function() {
			this.sMP(1);
			sGA(_s_SIM, _s_CFG, 'Medium', 0);
        };
		//// setLarge
		AppSimulator.prototype.sL = function() {
			this.sMP(2);
			sGA(_s_SIM, _s_CFG, 'Large', 0);
        };
		//// setHuge
		AppSimulator.prototype.sH = function() {
			this.sMP(3);
			sGA(_s_SIM, _s_CFG, 'Huge', 0);
        };
		//// setDuration
		AppSimulator.prototype.sD = function() {
			this.iD = true;
			this.sS();
        };
		//// setRequests
		AppSimulator.prototype.sR = function() {
			this.iD = false;
			this.sS();
        };
		//// isDurationMethod
		AppSimulator.prototype.iDM = function() {
			return this.iD;
        };
		//// usedDurationMethod
		AppSimulator.prototype.uDM = function() {
			return this.exM === _s_STA;
        };
		//// getSimulationMethod
		AppSimulator.prototype.gSM = function() {
			return this.iD ? _s_STA : _s_STR;
        };
		//// onRefLinkClick
		AppSimulator.prototype.oRLC = function(t, d) {
			sGA("Reference", t, d, 0);
		};
		//// showRef
		AppSimulator.prototype.shR = function() {
			this.sRe = !this.sRe;
			if (this.sRe) {
				this.lE = false;
			}
		};
		//// showLive
		AppSimulator.prototype.shL = function() {
			this.lE = !this.lE;
			if (this.lE) {
				this.sRe = false;
			}
		};
		//// getDatabaseStatus
		AppSimulator.prototype.gDS = function(cond) {
			switch (cond) {
				case 0:
					return 'text-info';
				case 2:
					return 'text-primary';
				case 1:
					return 'text-muted';
				case 3:
					return 'text-danger bg-danger';
			}
		};
		//// percValue
		AppSimulator.prototype.pV = function() {
			return (this.rOK * 100 / this.rqCt) | 0;
		};
		//// calcPosition
		AppSimulator.prototype.cP = function(h) {
			return (this.rOK * h / 100) | 0;
		};
		//// getDurationRequests
		AppSimulator.prototype.gDR = function() {
			var tot = (this.rqDu * 1000 * this.rqCn / this.rqIn) | 0;
			return tot - (tot % this.rqCn);
		};
		//// getDurationThroughput
		AppSimulator.prototype.gDT = function() {
			return (this.gDR() / this.rqDu) | 0;
		};
		//
		// Execution control methods
		//
		//// isRunning
		AppSimulator.prototype.iR = function() {
            return this.running;
		};
		//// getRandomOperation
		AppSimulator.prototype.gRO = function() {
			return this.oP[(Math.random() * 10) | 0];
		};
		//// getRandomDBRecord
		var gRD = function() {
			return (Math.random() * 16384) | 0;
		};
		//// populateRequestSamples
		AppSimulator.prototype.pRS = function() {
			for (var q = 0; q < this.rqCt; q++) {
				var o = this.gRO();
				this.oT[o]++;
				this.rq[0].push(_j_ERE);
				this.rq[1].push(this.hS.get(q, _s_AURL, o, gRD()));
				this.rq[2].push(o);
			}
		};
		//// calculateHistogram
		AppSimulator.prototype.cH = function() {
			this.lE = false;
			this.rCD();
			var dr     = ((this.rqEx * 0.0455) | 0) + 1,
			    dLo    = (dr / 2) | 0,
			    dUp    = this.rqEx - dLo,
			    self   = this,
			    setBcd = function(i, l, v) {
				    self.bcd[i].values.push({
					                        label: l,
					                        value: v
				                        });
			    },
			    rq0    = this.rq[0];
			this.tpA = 0;
			this.tpX = 0;
			this.tpN = 0;
			this.tpR = 0;
			this.toA = 0;
			this.toX = 0;
			this.toN = 0;
			this.toR = 0;
			//
			// Populate barchart as processed (no sorting)
			//
			for (var i = 0; i < rq0.length; i++) {
				var _hst  = rq0[i].H,
				    _rid  = rq0[i].Q,
				    rtt   = [0,
				             0,
				             0,
				             0],
				    tsn   = [0,
				             0,
				             0,
				             0],
				    exts  = [0,
				             0,
				             0,
				             0],
				    red   = [0,
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
            }
            //
            // HDR by RTT (AngularJS time)
            //
			var hdPD = {arr: []};
			for (var n = 0; n < rq0.length; n++) {
				hdPD.arr.push(rq0[n].A);
            }
			//
			// Helpers
			//
			var byH = function(hl, hv, v) {
				return hl === hv ? v : 0;
			};
			var inSD = function(i, v) {
				return ((i >= dLo) && (i <= dUp)) ? v : 0;
			};
			var inSDbyH = function(hl, hv, i, v) {
				return ((hl === hv) && (i >= dLo) && (i <= dUp)) ? v : 0;
			};
            //
            // Sorting by RTT (AngularJS time)
            //
			var totReqAng = [0,
			                 0,
			                 0,
			                 0];
			rq0.sort(function(a, b) {return a.A - b.A});
			for (i = 0; i < rq0.length; i++) {
				var _hstR = rq0[i].H,
				    _rttR = rq0[i].A;
				for (j = 0; j < 4; j++) {
					rtt[j] = byH(_hstR, j, _rttR);
					this.pcd2[j].y += inSD(i, rtt[j]);
					totReqAng[j] += inSDbyH(_hstR, j, i, 1);
				}
				this.toA += inSD(i, _rttR);
			}
			for (i = 0; i < 4; i++) {
				this.pcd2[i].y /= totReqAng[i];
			}
			this.tpA = ((this.rqEx / (this.dur / 1000)) | 0) + 1;
			for (i = 0; i < this.hg.length; i++) {
				this.hg[i][1] = rq0[((this.rqEx * this.hg[i][0] / 100) | 0) - 1].A;
            }
			//
			// Sorting by TSN (nginX time)
			//
			var totReqNgi = [0,
			                 0,
			                 0,
			                 0];
			rq0.sort(function(a, b) {return a.X - b.X});
			for (i = 0; i < this.hg.length; i++) {
				this.hg[i][2] = rq0[((this.rqEx * this.hg[i][0] / 100) | 0) - 1].X;
            }
			for (i = 0; i < rq0.length; i++) {
				var _hstT = rq0[i].H,
				    _tsnT = rq0[i].X;
				for (j = 0; j < 4; j++) {
					tsn[j] = byH(_hstT, j, _tsnT);
					this.pcd[j].y += inSD(i, tsn[j]);
					totReqNgi[j] += inSDbyH(_hstT, j, i, 1);
				}
				this.toX += inSD(i, _tsnT);
			}
			for (i = 0; i < 4; i++) {
				this.pcd[i].y /= totReqNgi[i];
			}
			this.tpX = ((this.tpA * this.toA / this.toX) | 0) + 1;
			//
			// Sort by EXTS (nodeJS time)
			//
			rq0.sort(function(a, b) {return a.N - b.N});
			for (i = 0; i < this.hg.length; i++) {
				this.hg[i][3] = rq0[((this.rqEx * this.hg[i][0] / 100) | 0) - 1].N;
            }
			for (i = 0; i < rq0.length; i++) {
				this.toN += inSD(i, rq0[i].N);
			}
			this.tpN = ((this.tpX * this.toX / this.toN) | 0) + 1;
            //
            // Sort by RED (redis.io time)
            //
			rq0.sort(function(a, b) {return a.R - b.R});
			for (i = 0; i < this.hg.length; i++) {
				this.hg[i][4] = rq0[((this.rqEx * this.hg[i][0] / 100) | 0) - 1].R;
            }
			for (i = 0; i < rq0.length; i++) {
				this.toR += inSD(i, rq0[i].R);
            }
			this.tpR = ((this.tpN * this.toN / this.toR) | 0) + 1;
            //
            // Calculating HDR Histogram
            //
			var hdrAr = {
				table: [],
				chart: []
			};
			this.lcd[0].values = [];
			this.lcd[1].values = [];
			this.oRTT = this.hS.post(_s_HURL, JSON.stringify(hdPD)).subscribe(
	            function(re) {
		            hdrAr = re;
		            self.rq[0].sort(function(a, b) {return a.A - b.A});
		            for (var n = 0; n < hdrAr.chart.length; n++) {
			            var idx = ((hdrAr.chart[n].percentile * self.rOK / 100) | 0) - 1;
			            self.lcd[0].values.push({
				                                    x: hdrAr.chart[n].percentile,
				                                    y: hdrAr.chart[n].value
		                                                     });
			            self.lcd[1].values.push({
				                                    x: hdrAr.chart[n].percentile,
				                                    y: self.rq[0][(idx < 0) ? 0 : idx].A
		                                                     });
	                }
                },
	            function(error) {
                    console.log("HDR Service error");
                },
	            function() {
		            self.oRTT.unsubscribe();
		            self.clc = false;
		            self.running = false;
		            self.lE = false;
                }
            );
			sGA(_s_SIM, 'Execution', 'Throughput', this.tpA);
        };
		//// observableResponse
		AppSimulator.prototype.oR = function(re) {
			for (var k = 0; k < re.length; k++) {
				var res = re[k],
				    req = res.Q,
				    hst = res.json.hostname,
				    ndx = this.nix[hst][0],
				    cch = res.C;
				this.rq[0][req] = {
					Q: 'Req ' + ((req | 0) + 1),
					H: ndx,
					A: res.A,
					X: res.X,
					N: res.N,
					R: res.R,
					C: cch
				};
				if (cch) {
					this.rqCh++;
					this.chRe.push(++this.rOK);
				}
				else {
					var pid = res.json.pid,
					    o   = this.rq[2][req];
					if (!(pid in this.pix[hst])) {
						this.rs[ndx][1].push([pid,
						                      [[],
						                            [],
						                            [],
						                            []]]);
						this.pix[hst][pid] = this.rs[ndx][1].length - 1;
					}
					this.rs[ndx][1][this.pix[hst][pid]][1][o].push(++this.rOK);
					this.nix[hst][1]++;
				}
			}
		};
		//// startStatistics
		AppSimulator.prototype.sSt = function() {
			this.clc = true;
			var self = this;
			setTimeout(function() {self.cH();});
		};
		//// throwHTTPduration
		AppSimulator.prototype.tHd = function(rqCt, rqCn, rqDu, rqIn) {
            var self = this,
                tmR  = true,
                cnRq = 0,
                cnRe = 0,
                sHd  = function() {
	                if (inH) {
		                clearInterval(inH);
	                }
	                self.dur = Date.now() - self.iniTime;
	                self.rqEx = cnRe;
	                self.sSt();
                },
                inF  = function() {
	                if (tmR && cnRq < rqCt) {
		                cnRq += rqCn;
		                var oRA = Rx.Observable.forkJoin(self.rq[1].slice(cnRq - rqCn, cnRq)).subscribe(
			                function(r) {
				                self.oR(r);
			                },
			                function(e) {
				                self.rER += rqCn;
			                },
			                function() {
				                cnRe += rqCn;
				                oRA.unsubscribe();
				                if (!tmR && !self.clc && cnRq === cnRe) {
					                sHd();
				                }
			                }
		                );
	                }
	                else {
		                if (!self.clc && cnRq === cnRe) {
			                sHd();
		                }
	                }
                };
			//
			// Initialize execution
			//
			self.iniTime = Date.now();
			setTimeout(function() {
				tmR = false;
			}, (rqDu * 1000) + 10);
			setTimeout(function() {inF()});
			var inH = setInterval(function() {inF()}, rqIn);
        };
		//// throwHTTPrequests
		AppSimulator.prototype.tHr = function(rqCt, rqCn) {
			var self = this,
			    cnRe = 0,
			    ev   = new ng.core.EventEmitter(true);
			ev.subscribe(function() {
				var nIdx = cnRe + rqCn,
				    oRA  = Rx.Observable.forkJoin(self.rq[1].slice(cnRe, nIdx)).subscribe(
					    function(r) {
						    self.oR(r);
					    },
					    function(e) {
						    self.rER += rqCn;
					    },
					    function() {
						    cnRe += rqCn;
						    oRA.unsubscribe();
						    if (cnRe >= rqCt) {
							    ev.unsubscribe();
							    self.dur = Date.now() - self.iniTime;
							    self.rqEx = rqCt;
							    self.sSt();
						    }
						    else {
							    ev.emit();
						    }
					    }
				    );
			});
			self.iniTime = Date.now();
			ev.emit();
		};
		//// startSimulator
		AppSimulator.prototype.sSi = function() {
			////
			//// Initialize execution variables - once for each execution
			//// all first time initialization performed on constructor function
			////
			//
			// Save execution parameters
			//
			this.sEPC();
			//
			// Reset Live Events socket variables
			//
			this.rLEM();
			//
			// Reset view presentation variables - control
			//
			this.rVPCV();
			this.lE = true;
			//
			// Reset execution scope variables
			//
			this.rESV();
			//
			// Reset view execution variables
			//
			this.rVEV();
			this.running = true;
			//
			// Switch among simulation methods (stress or duration)
			//
			if (this.iD) {
				//
				// Stability - duration
				//
				this.rqCt = this.gDR();
	            this.pRS();
				this.tHd(this.rqCt, this.rqCn, this.rqDu, this.rqIn);
            }
            else {
				//
				// Stress - requests
				//
	            this.pRS();
				this.tHr(this.rqCt, this.rqCn);
            }
		};
		return AppSimulator;
	})();
})(window.app || (window.app = {}));
