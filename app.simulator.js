(function(app) {
	app.AppSimulator = (function() {
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
		      _a_OPE  = [0,
		                 0,
		                 0,
		                 0,
		                 0,
		                 0,
		                 0,
		                 1,
		                 2,
		                 3],
		      _a_GDS  = ['text-info',
		                 'text-primary',
		                 'text-muted',
		                 'text-danger'];
		//// helper functions
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
		    },
		    //// Google Analytics
		    sGA = function(a, b, c, d) {
			ga('send', 'event', a, b, c, d);
		    },
		    //// initCharts
		    cP  = function(t) {
			    return {
				    chart: {
					    type:          'pieChart',
					    height:        299,
					    showLegend:    false,
					    donut:         true,
					    padAngle:      0.08,
					    cornerRadius:  5,
					    title:         t,
					    x:             function(d) {return d.key;},
					    y:             function(d) {return d.y;},
					    showLabels:    true,
					    labelType:     function(d) {return d.data.key + ': ' + (d.data.y | 0);},
					    labelsOutside: true,
					    duration:      500
				    }
			    }
		    },
		    //// resetExecutionScopeVariables
		    cRS = function() {
			    return [[_s_PI2,
			             [],
			             0],
			            [_s_PI3,
			             [],
			             0],
			            [_s_PI5,
			             [],
			             0],
			            [_s_PI6,
			             [],
			             0]];
		    },
		    //// getRandomOperation
		    gRO  = function() {
			    return _a_OPE[(Math.random() * 10) | 0];
		    },
		    //// getRandomDBRecord
		    gRD  = function() {
			    return (Math.random() * 16384) | 0;
		    },
		    //// createPIX
		    cPIX = function() { return JSON.parse('{"' + _s_PI2 + '":[0,{}],"' + _s_PI3 + '":[1,{}],"' + _s_PI5 + '":[2,{}],"' + _s_PI6 + '":[3,{}]}'); };
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
			this.rVEV();
			this.run = false;
			//
			// View execution parameters
			//
			this.iD = false;
			this.rqCn = 2;
			this.rqCt = 100;
			this.rqDu = 5;
			this.rqIn = 50;
			//
			// View presentation variables - control
			//
			this.lE = false;
			//
			// View presentation variables - reference links
			//
			this.links = iRL(this);
			//
			// Charts configuration and initialization
			//
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
					brushExtent:             [75,
					                          100]
				}
			};
			this.pco = cP('nginX');
			this.pco2 = cP('AngularJS');
			//
			// Live Events socket variables and configuration
			//
			var self = this;
			io(_s_IURL).on('redis', function(d) {
				if (self.leMx[d.x][d.y] < 3) {
					var x = d.x,
					    y = d.y;
					self.leMx[x][y] = 3;
					var to = setTimeout(function() {
						self.leMx[x][y] = ((((x << 5) + y) << 4) / 2731) | 0;
						clearTimeout(to);
					}, 1000);
				}
			});
		}
		AppSimulator.parameters = [
			app.HTTPService,
			ng.platformBrowser.DomSanitizationService
		];
		AppSimulator.annotations = [
			new ng.core.Component({
				selector:    'n-c-s',
				templateUrl: 'simulator.html',
				providers:   [
					app.HTTPService,
					//ng.http.HTTP_PROVIDERS,
					ng.platformBrowser.DomSanitizationService
					//,ng.platformBrowser.BROWSER_SANITIZATION_PROVIDERS
				],
				directives:  [nvD3]
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
		//// saveExecutionParametersCopy & resetLiveEventsMatrix
		AppSimulator.prototype.sEPC = function() {
			this.exM = this.gSM();
			this.exR = this.rqCt;
			this.exD = this.rqDu;
			this.exI = this.rqIn;
			this.exC = this.rqCn;
			this.exmR = this.gDR();
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
		AppSimulator.prototype.gDS = function(c) {
			return _a_GDS[c];
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
			return this.run;
		};
		//// populateRequestSamples
		AppSimulator.prototype.pRS = function(rqCt) {
			var rq = [[],
			          [],
			          []],
			    oT = [0,
			          0,
			          0,
			          0];
			for (var q = 0; q < rqCt; q++) {
				var o = gRO();
				oT[o]++;
				rq[0].push(_j_ERE);
				rq[1].push(this.hS.get(q, _s_AURL, o, gRD()));
				rq[2].push(o);
			}
			return [rq,
			        oT];
		};
		//// calculateHistogram
		AppSimulator.prototype.cH = function(rqEx, dur, rq) {
			this.lE = false;
			//// resetChartsData
			var cBC       = function(k1, k2) {
				    return {
					    key:    k1 + k2,
					    values: []
				    };
			    },
			    cPC       = function(k) {
				    return {
					    key: k,
					    y:   0
				    };
			    },
			    bcd       = [cBC(_s_PI2, _s_RED),
			              cBC(_s_PI3, _s_RED),
			              cBC(_s_PI5, _s_RED),
			              cBC(_s_PI6, _s_RED),
			              cBC(_s_PI2, _s_NOD),
			              cBC(_s_PI3, _s_NOD),
			              cBC(_s_PI5, _s_NOD),
			              cBC(_s_PI6, _s_NOD),
			              cBC(_s_PI2, _s_NGI),
			              cBC(_s_PI3, _s_NGI),
			              cBC(_s_PI5, _s_NGI),
			              cBC(_s_PI6, _s_NGI),
			              cBC(_s_PI2, _s_ANG),
			              cBC(_s_PI3, _s_ANG),
			              cBC(_s_PI5, _s_ANG),
			              cBC(_s_PI6, _s_ANG)],
			    pcd    = [cPC(_s_PI2),
			              cPC(_s_PI3),
			              cPC(_s_PI5),
			              cPC(_s_PI6)],
			    pcd2   = [cPC(_s_PI2),
			              cPC(_s_PI3),
			              cPC(_s_PI5),
			              cPC(_s_PI6)],
			    lcd       = [
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
			    ],
			    dr        = ((rqEx * 0.0455) | 0) + 1,
			    dLo       = (dr / 2) | 0,
			    dUp       = rqEx - dLo,
			    self      = this,
			    setBcd    = function(i, l, v) {
				    bcd[i].values.push({
					                        label: l,
					                        value: v
				                        });
			    },
			    rq0       = rq[0],
			    rq1       = rq[0].slice(0),
			    rq2       = rq[0].slice(0),
			    rq3       = rq[0].slice(0),
			    toA       = 0,
			    toX       = 0,
			    toN       = 0,
			    toR       = 0,
			    hg        = [[50,
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
			    hdPD      = {arr: []},
			    byH       = function(hl, hv, v) {
				    return hl === hv ? v : 0;
			    },
			    inSD      = function(i, v) {
				    return ((i >= dLo) && (i <= dUp)) ? v : 0;
			    },
			    inSDbyH   = function(hl, hv, i, v) {
				    return ((hl === hv) && (i >= dLo) && (i <= dUp)) ? v : 0;
			    };
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
				hdPD.arr.push(rq0[i].A);
            }
			//
			// Prepare histogram
			//
			rq0.sort(function(a, b) {return a.A - b.A});
			rq1.sort(function(a, b) {return a.X - b.X});
			rq2.sort(function(a, b) {return a.N - b.N});
			rq3.sort(function(a, b) {return a.R - b.R});
			for (i = 0; i < rq0.length; i++) {
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
            // Calculating HDR Histogram
            //
			this.oRT = this.hS.post(_s_HURL, JSON.stringify(hdPD)).subscribe(
				function(re) {
		            for (var n = 0; n < re.chart.length; n++) {
			            var idx = ((re.chart[n].percentile * self.rOK / 100) | 0) - 1;
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
		            self.lcd = lcd;
		            self.oRT.unsubscribe();
		            self.clc = false;
		            self.run = false;
		            self.lE = false;
                }
            );
			//
			// Set Angular view variables
			//
			sGA(_s_SIM, 'Execution', 'Throughput', tpA);
			return [bcd,
			        pcd,
			        pcd2,
			        tpA,
			        tpX,
			        tpN,
			        tpR,
			        hg];
        };
		//// observableResponse
		AppSimulator.prototype.oR = function(re, rs, rq, cc, pix) {
			for (var k = 0; k < re.length; k++) {
				var res = re[k],
				    req = res.Q,
				    hst = res.json.hostname,
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
					this.rqCh++;
					cc.push(++this.rOK);
				}
				else {
					var pid = res.json.pid,
					    o   = rq[2][req];
					if (!(pid in pix[hst][1])) {
						rs[ndx][1].push([pid,
						                 [[],
						                            [],
						                            [],
						                            []]]);
						pix[hst][1][pid] = rs[ndx][1].length - 1;
					}
					rs[ndx][1][pix[hst][1][pid]][1][o].push(++this.rOK);
					rs[ndx][2]++;
				}
			}
		};
		//// startStatistics
		AppSimulator.prototype.sSt = function(rqEx, dur, cnEr, rq, rs, cc) {
			this.clc = true;
			this.dur = dur;
			this.rqEx = rqEx;
			this.rER = cnEr;
			this.rs = rs;
			this.chRe = cc;
			var self = this;
			setTimeout(function() {
				[self.bcd,
				 self.pcd,
				 self.pcd2,
				 self.tpA,
				 self.tpX,
				 self.tpN,
				 self.tpR,
				 self.hg] = self.cH(rqEx, dur, rq);
			});
		};
		//// throwHTTPduration
		AppSimulator.prototype.tHd = function(rqCt, rqCn, rqDu, rqIn, rq) {
            var self = this,
                tmR  = true,
                cnRq = 0,
                cnRe = 0,
                cnEr = 0,
                cc   = [],
                pix  = cPIX(),
                rs   = cRS(),
                sHd  = function() {
	                if (inH) {
		                clearInterval(inH);
	                }
	                var finTime = Date.now() - iniTime;
	                self.sSt(cnRe, finTime, cnEr, rq, rs, cc);
                },
                inF  = function() {
	                if (tmR && cnRq < rqCt) {
		                cnRq += rqCn;
		                var oRA = Rx.Observable.forkJoin(rq[1].slice(cnRq - rqCn, cnRq)).subscribe(
			                function(r) {
				                self.oR(r, rs, rq, cc, pix);
			                },
			                function(e) {
				                cnEr += rqCn;
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
			var iniTime = Date.now();
			setTimeout(function() {
				tmR = false;
			}, (rqDu * 1000) + 10);
			setTimeout(function() {inF()});
			var inH = setInterval(function() {inF()}, rqIn);
        };
		//// throwHTTPrequests
		AppSimulator.prototype.tHr = function(rqCt, rqCn, rq) {
			var self = this,
			    cnRe = 0,
			    cnEr = 0,
			    cc   = [],
			    pix  = cPIX(),
			    rs   = cRS(),
			    ev   = new ng.core.EventEmitter(true);
			ev.subscribe(function() {
				var nIdx = cnRe + rqCn,
				    oRA  = Rx.Observable.forkJoin(rq[1].slice(cnRe, nIdx)).subscribe(
					    function(r) {
						    self.oR(r, rs, rq, cc, pix);
					    },
					    function(e) {
						    cnEr += rqCn;
					    },
					    function() {
						    cnRe += rqCn;
						    oRA.unsubscribe();
						    if (cnRe >= rqCt) {
							    ev.unsubscribe();
							    var finTime = Date.now() - iniTime;
							    self.sSt(rqCt, finTime, cnEr, rq, rs, cc);
						    }
						    else {
							    ev.emit();
						    }
					    }
				    );
			});
			var iniTime = Date.now();
			ev.emit();
		};
		//// startSimulator
		AppSimulator.prototype.sSi = function() {
			////
			//// Initialize execution variables - once for each execution
			//// all first time initialization performed on constructor function
			////
			//
			// Save execution parameters & Reset Live Events socket variables
			//
			this.sEPC();
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
			this.lE = true;
			//
			// Switch among simulation methods (stress or duration)
			//
			var rq = [];
			if (this.iD) {
				//
				// Stability - duration
				//
				this.rqCt = this.gDR();
				[rq,
				 this.oT] = this.pRS(this.rqCt);
				this.tHd(this.rqCt, this.rqCn, this.rqDu, this.rqIn, rq);
            }
            else {
				//
				// Stress - requests
				//
				[rq,
				 this.oT] = this.pRS(this.rqCt);
				this.tHr(this.rqCt, this.rqCn, rq);
            }
		};
		return AppSimulator;
	})();
})(window.app || (window.app = {}));
