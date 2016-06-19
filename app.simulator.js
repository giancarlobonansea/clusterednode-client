"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
			r = Reflect.decorate(decorators, target, key, desc);
		}
		else {
			for (var i = decorators.length - 1; i >= 0; i--) {
				if (d = decorators[i]) {
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
				}
			}
		}
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata = (this && this.__metadata) || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
			return Reflect.metadata(k, v);
		}
	};
var __param = (this && this.__param) || function(paramIndex, decorator) {
		return function(target, key) { decorator(target, key, paramIndex); }
	};
var core_1 = ng.core;
var nvD3 = (function() {
	function nvD3(elementRef) {
		this.el = elementRef.nativeElement;
	}

	nvD3.prototype.ngOnChanges = function() {
		this.updateWithOptions(this.options);
	};
	nvD3.prototype.updateWithOptions = function(options) {
		var self = this;
		this.clearElement();
		if (!options) {
			return;
		}
		this.chart = nv.models[options.chart.type]();
		this.chart.id = Math.random().toString(36).substr(2, 15);
		for (var key in this.chart) {
			if (!this.chart.hasOwnProperty(key)) {
				continue;
			}
			var value = this.chart[key];
			if (key[0] === '_') { }
			else if ([
					'clearHighlights',
					'highlightPoint',
					'id',
					'options',
					'resizeHandler',
					'state',
					'open',
					'close',
					'tooltipContent'
				].indexOf(key) >= 0) { }
			else if (key === 'dispatch') {
				this.configureEvents(this.chart[key], options.chart[key]);
			}
			else if ([
					'bars',
					'bars1',
					'bars2',
					'boxplot',
					'bullet',
					'controls',
					'discretebar',
					'distX',
					'distY',
					'interactiveLayer',
					'legend',
					'lines',
					'lines1',
					'lines2',
					'multibar',
					'pie',
					'scatter',
					'scatters1',
					'scatters2',
					'sparkline',
					'stack1',
					'stack2',
					'sunburst',
					'tooltip',
					'x2Axis',
					'xAxis',
					'y1Axis',
					'y2Axis',
					'y3Axis',
					'y4Axis',
					'yAxis',
					'yAxis1',
					'yAxis2'
				].indexOf(key) >= 0 ||
				(key === 'stacked' && options.chart.type === 'stackedAreaChart')) {
				this.configure(this.chart[key], options.chart[key], options.chart.type);
			}
			else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart') { }
			else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart') { }
			else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart') { }
			else if (options.chart[key] === undefined || options.chart[key] === null) { }
			else {
				this.chart[key](options.chart[key]);
			}
		}
		this.updateWithData(this.data);
		nv.addGraph(function() {
			if (!self.chart) {
				return;
			}
			if (self.chart.resizeHandler) {
				self.chart.resizeHandler.clear();
			}
			self.chart.resizeHandler = nv.utils.windowResize(function() {
				self.chart && self.chart.update && self.chart.update();
			});
			return self.chart;
		}, options.chart['callback']);
	};
	nvD3.prototype.updateWithData = function(data) {
		if (data) {
			d3.select(this.el).select('svg').remove();
			var h, w;
			this.svg = d3.select(this.el).append('svg');
			if (h = this.options.chart.height) {
				if (!isNaN(+h)) {
					h += 'px';
				}
				this.svg.attr('height', h).style({height: h});
			}
			if (w = this.options.chart.width) {
				if (!isNaN(+w)) {
					w += 'px';
				}
				this.svg.attr('width', w).style({width: w});
			}
			else {
				this.svg.attr('width', '100%').style({width: '100%'});
			}
			this.svg.datum(data).call(this.chart);
		}
	};
	nvD3.prototype.configure = function(chart, options, chartType) {
		if (chart && options) {
			for (var key in chart) {
				if (!chart.hasOwnProperty(key)) {
					continue;
				}
				var value = chart[key];
				if (key[0] === '_') { }
				else if (key === 'dispatch') {
					this.configureEvents(value, options[key]);
				}
				else if (key === 'tooltip') {
					this.configure(chart[key], options[key], chartType);
				}
				else if (key === 'contentGenerator') {
					if (options[key]) {
						chart[key](options[key]);
					}
				}
				else if ([
						'axis',
						'clearHighlights',
						'defined',
						'highlightPoint',
						'nvPointerEventsClass',
						'options',
						'rangeBand',
						'rangeBands',
						'scatter',
						'open',
						'close'
					].indexOf(key) === -1) {
					if (options[key] === undefined || options[key] === null) { }
					else {
						chart[key](options[key]);
					}
				}
			}
		}
	};
	nvD3.prototype.configureEvents = function(dispatch, options) {
		if (dispatch && options) {
			for (var key in dispatch) {
				if (!dispatch.hasOwnProperty(key)) {
					continue;
				}
				var value = dispatch[key];
				if (options[key] === undefined || options[key] === null) { }
				else {
					dispatch.on(key + '._', options[key]);
				}
			}
		}
	};
	nvD3.prototype.clearElement = function() {
		this.el.innerHTML = '';
		if (this.chart && this.chart.tooltip && this.chart.tooltip.id) {
			d3.select('#' + this.chart.tooltip.id()).remove();
		}
		if (nv.graphs && this.chart) {
			for (var i = nv.graphs.length - 1; i >= 0; i--) {
				if (nv.graphs[i] && (nv.graphs[i].id === this.chart.id)) {
					nv.graphs.splice(i, 1);
				}
			}
		}
		if (nv.tooltip && nv.tooltip.cleanup) {
			nv.tooltip.cleanup();
		}
		if (this.chart && this.chart.resizeHandler) {
			this.chart.resizeHandler.clear();
		}
		this.chart = null;
	};
	nvD3 = __decorate([
		                  core_1.Component({
			                                   selector: 'nvd3',
			                                   inputs:   ['options',
			                                              'data'],
			                                   template: ""
		                                   }),
		                  __param(0, core_1.Inject(core_1.ElementRef)),
		                  __metadata('design:paramtypes', [core_1.ElementRef])
	                  ], nvD3);
	return nvD3;
}());
(function(app) {
	app.AppSimulator = (function() {
		function AppSimulator(HTTPService) {
			this.histogram = [[50,
			                   0],
			                  [75,
			                   0],
			                  [90,
			                   0],
			                  [95,
			                   0],
			                  [100,
			                   0]];
			this.requests = [[],
			                 []];
			this.reqConn = 4;
			this.reqCount = 100;
			this.running = -1;
			this.reqErrors = 0;
			this.reqOK = 0;
			this.loopCon = 0;
			this.duration = 0;
			this.totAngular = 0;
			this.totNginx = 0;
			this.totNode = 0;
			this.tpAngular = 0;
			this.tpNginx = 0;
			this.tpNode = 0;
			this.calculating = false;
			this.httpService = HTTPService;
			this.urlOptions = [['https://giancarlobonansea.homeip.net:33333/api',
			                    'DNS Public'],
			                   ['https://raspberrypi4:8010/api',
			                    'DNS Private'],
			                   ['https://192.168.69.242:8010/api',
			                    'IP Private']];
            this.urlHDR = 'https://giancarlobonansea.homeip.net:33333/hdr';
			this.selectedUrl = this.urlOptions[0][0];
			this.barChartOptions = {
				chart: {
					type:         'multiBarChart',
					showControls: false,
					height:       300,
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
						tickFormat:        function(d) {
							return d3.format('d')(d);
						}
					}
				}
			};
			this.polarChartOptions = {
				chart: {
					type:          'pieChart',
					height:        205,
					showLegend:    false,
					donut:         true,
					padAngle:      .08,
					cornerRadius:  5,
					title:         'nginX',
					x:             function(d) {return d.key;},
					y:             function(d) {return d.y;},
					showLabels:    true,
					labelType:     function(d) {return d.data.key + ': ' + parseInt(d.data.y);},
					labelsOutside: true,
					duration:      500
				}
			};
			this.polarChartOptions2 = {
				chart: {
					type:          'pieChart',
					height:        205,
					showLegend:    false,
					donut:         true,
					padAngle:      .08,
					cornerRadius:  5,
					title:         'AngularJS',
					x:             function(d) {return d.key;},
					y:             function(d) {return d.y;},
					showLabels:    true,
					labelsOutside: true,
					labelType:     function(d) {return d.data.key + ': ' + parseInt(d.data.y);},
					duration:      500
				}
			};
			this.barChartData = [{key: 'raspberrypi2-node', values: [{label: '', value: 0}]},
			                     {key: 'raspberrypi3-node', values: [{label: '', value: 0}]},
			                     {key: 'raspberrypi5-node', values: [{label: '', value: 0}]},
			                     {key: 'raspberrypi6-node', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi2-nginx', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi3-nginx', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi5-nginx', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi6-nginx', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi2-angular', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi3-angular', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi5-angular', values: [{label: '', value: 0}]},
								 {key: 'raspberrypi6-angular', values: [{label: '', value: 0}]}
			                     ];
			this.polarChartData = [{key: 'raspberrypi2', y: 25},
			                       {key: 'raspberrypi3', y: 25},
			                       {key: 'raspberrypi5', y: 25},
			                       {key: 'raspberrypi6', y: 25}];
			this.polarChartData2 = [{key: 'raspberrypi2', y: 25},
			                       {key: 'raspberrypi3', y: 25},
			                       {key: 'raspberrypi5', y: 25},
			                       {key: 'raspberrypi6', y: 25}];
			this.observableRequests = undefined;
		}
		AppSimulator.parameters = [
			app.HTTPService
		];
		AppSimulator.annotations = [
			new ng.core.Component({
				selector:     'node-cluster-simulator',
				templateUrl:  'simulator.html',
				providers:    [
					app.HTTPService,
					ng.http.HTTP_PROVIDERS
				],
				directives: [nvD3]
			})
		];
		AppSimulator.prototype.setSmall = function() {
			this.reqCount = 100;
			this.reqConn = 4;
            ga('send', 'event', 'Simulation', 'Configuration', 'Small Preset');
		};
		AppSimulator.prototype.setMedium = function() {
			this.reqCount = 512;
			this.reqConn = 16;
            ga('send', 'event', 'Simulation', 'Configuration', 'Medium Preset');
        };
		AppSimulator.prototype.setLarge = function() {
			this.reqCount = 1024;
			this.reqConn = 64;
            ga('send', 'event', 'Simulation', 'Configuration', 'Large Preset');
        };
		AppSimulator.prototype.setHuge = function() {
			this.reqCount = 2048;
			this.reqConn = 128;
            ga('send', 'event', 'Simulation', 'Configuration', 'Huge Preset');
        };
		AppSimulator.prototype.perc = function(p) {
			var curPerc = Math.ceil(this.reqOK * 12 / this.reqCount);
			return (curPerc>=p);
		};
		AppSimulator.prototype.isRunning = function() {
			return (this.running !== -1);
		};
		AppSimulator.prototype.calculateHistogram = function() {
			this.barChartData = [{key: 'raspberrypi2-node', values: []},
			                     {key: 'raspberrypi3-node', values: []},
			                     {key: 'raspberrypi5-node', values: []},
			                     {key: 'raspberrypi6-node', values: []},
								 {key: 'raspberrypi2-nginx', values: []},
								 {key: 'raspberrypi3-nginx', values: []},
								 {key: 'raspberrypi5-nginx', values: []},
								 {key: 'raspberrypi6-nginx', values: []},
			                     {key: 'raspberrypi2-angular', values: []},
			                     {key: 'raspberrypi3-angular', values: []},
			                     {key: 'raspberrypi5-angular', values: []},
			                     {key: 'raspberrypi6-angular', values: []}];
			this.polarChartData = [{key: 'raspberrypi2', y: 0},
			                       {key: 'raspberrypi3', y: 0},
			                       {key: 'raspberrypi5', y: 0},
			                       {key: 'raspberrypi6', y: 0}];
			this.polarChartData2 = [{key: 'raspberrypi2', y: 0},
			                       {key: 'raspberrypi3', y: 0},
			                       {key: 'raspberrypi5', y: 0},
			                       {key: 'raspberrypi6', y: 0}];
			this.disregard = parseInt(Math.ceil(this.reqCount * 4.55 / 100.0));
			this.discardLower = Math.floor(this.disregard/2);
			this.discardUpper = this.reqCount-Math.ceil(this.disregard/2)-1;
			//
			// Sorting by RTT (AngularJS time)
			//
            var hdrRTTpost = {"arr": []};
            for (var n = 0; n < this.requests[0].length; n++) {
                hdrRTTpost.arr.push(this.requests[0][n].rtt);
            }
            console.log(hdrRTTpost);
            this.hdrRTTresults = [];
            var selfRTT = this;
            this.observableRTT = this.httpService.post(this.urlHDR, hdrRTTpost).subscribe(
                function(response) {
                    selfRTT.hdrRTTresults = response;
                },
                function(error) {
                    console.log("ERRO");
                },
                function() {
                    selfRTT.observableRTT.unsubscribe();
                    selfRTT.observableRTT = undefined;
                    console.log(selfRTT.hdrRTTresults);
                }
            );
			this.totReqAng = [0,0,0,0];
			this.requests[0].sort(function(a, b) {return a.rtt - b.rtt});
			for (var i = 0; i < this.requests[0].length; i++) {
				var rtt2 = this.requests[0][i].hst === 0 ? this.requests[0][i].rtt : 0;
				var rtt3 = this.requests[0][i].hst === 1 ? this.requests[0][i].rtt : 0;
				var rtt5 = this.requests[0][i].hst === 2 ? this.requests[0][i].rtt : 0;
				var rtt6 = this.requests[0][i].hst === 3 ? this.requests[0][i].rtt : 0;
				var tsn2 = this.requests[0][i].hst === 0 ? this.requests[0][i].tsn : 0;
				var tsn3 = this.requests[0][i].hst === 1 ? this.requests[0][i].tsn : 0;
				var tsn5 = this.requests[0][i].hst === 2 ? this.requests[0][i].tsn : 0;
				var tsn6 = this.requests[0][i].hst === 3 ? this.requests[0][i].tsn : 0;
				var exts2 = this.requests[0][i].hst === 0 ? this.requests[0][i].exts : 0;
				var exts3 = this.requests[0][i].hst === 1 ? this.requests[0][i].exts : 0;
				var exts5 = this.requests[0][i].hst === 2 ? this.requests[0][i].exts : 0;
				var exts6 = this.requests[0][i].hst === 3 ? this.requests[0][i].exts : 0;
				this.barChartData[0].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts2)});
				this.barChartData[1].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts3)});
				this.barChartData[2].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts5)});
				this.barChartData[3].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts6)});
				this.barChartData[4].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn2 - exts2)});
				this.barChartData[5].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn3 - exts3)});
				this.barChartData[6].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn5 - exts5)});
				this.barChartData[7].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn6 - exts6)});
				this.barChartData[8].values.push({label: this.requests[0][i].rid, value: rtt2 - tsn2});
				this.barChartData[9].values.push({label: this.requests[0][i].rid, value: rtt3 - tsn3});
				this.barChartData[10].values.push({label: this.requests[0][i].rid, value: rtt5 - tsn5});
				this.barChartData[11].values.push({label: this.requests[0][i].rid, value: rtt6 - tsn6});
				this.polarChartData2[0].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?rtt2:0;
				this.polarChartData2[1].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?rtt3:0;
				this.polarChartData2[2].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?rtt5:0;
				this.polarChartData2[3].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?rtt6:0;
				this.totReqAng[0] += ((this.requests[0][i].hst===0)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqAng[1] += ((this.requests[0][i].hst===1)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqAng[2] += ((this.requests[0][i].hst===2)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqAng[3] += ((this.requests[0][i].hst===3)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totAngular += ((i>=this.discardLower)&&(i<=this.discardUpper))?this.requests[0][i].rtt:0;
			}
			this.polarChartData2[0].y = this.polarChartData2[0].y / this.totReqAng[0];
			this.polarChartData2[1].y = this.polarChartData2[1].y / this.totReqAng[1];
			this.polarChartData2[2].y = this.polarChartData2[2].y / this.totReqAng[2];
			this.polarChartData2[3].y = this.polarChartData2[3].y / this.totReqAng[3];
			//this.tpAngular = parseInt(Math.ceil((this.reqCount-this.disregard)/(this.totAngular/1000.0)));
			this.tpAngular = parseInt(Math.ceil(this.reqCount/(this.duration/1000)));
			for (i = 0; i < this.histogram.length; i++)
				this.histogram[i][1] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].rtt;
			//
			// Sorting by TSN (nginX time)
			//
			this.totReqNgi = [0,0,0,0];
			this.requests[0].sort(function(a, b) {return a.tsn - b.tsn});
			for (i = 0; i < this.histogram.length; i++)
				this.histogram[i][2] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].tsn;
			for (i = 0; i < this.requests[0].length; i++) {
				var tsn2 = this.requests[0][i].hst === 0 ? this.requests[0][i].tsn : 0;
				var tsn3 = this.requests[0][i].hst === 1 ? this.requests[0][i].tsn : 0;
				var tsn5 = this.requests[0][i].hst === 2 ? this.requests[0][i].tsn : 0;
				var tsn6 = this.requests[0][i].hst === 3 ? this.requests[0][i].tsn : 0;
				this.polarChartData[0].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?tsn2:0;
				this.polarChartData[1].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?tsn3:0;
				this.polarChartData[2].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?tsn5:0;
				this.polarChartData[3].y += ((i>=this.discardLower)&&(i<=this.discardUpper))?tsn6:0;
				this.totReqNgi[0] += ((this.requests[0][i].hst===0)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqNgi[1] += ((this.requests[0][i].hst===1)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqNgi[2] += ((this.requests[0][i].hst===2)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totReqNgi[3] += ((this.requests[0][i].hst===3)&&(i>=this.discardLower)&&(i<=this.discardUpper))?1:0;
				this.totNginx += ((i>=this.discardLower)&&(i<=this.discardUpper))?this.requests[0][i].tsn:0;
			}
			this.polarChartData[0].y = this.polarChartData[0].y / this.totReqNgi[0];
			this.polarChartData[1].y = this.polarChartData[1].y / this.totReqNgi[1];
			this.polarChartData[2].y = this.polarChartData[2].y / this.totReqNgi[2];
			this.polarChartData[3].y = this.polarChartData[3].y / this.totReqNgi[3];
			//this.tpNginx = parseInt(Math.ceil((this.reqCount-this.disregard)/(this.totNginx/1000.0)));
			this.tpNginx = parseInt(Math.ceil(this.tpAngular*this.totAngular/this.totNginx));
			//
			// Sort by EXTS (nodeJS time)
			//
			this.requests[0].sort(function(a, b) {return a.exts - b.exts});
			for (i = 0; i < this.histogram.length; i++)
				this.histogram[i][3] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].exts;
			for (i = 0; i < this.requests[0].length; i++) {
				this.totNode += ((i>=this.discardLower)&&(i<=this.discardUpper))?this.requests[0][i].exts:0;
			}
			//this.tpNode = parseInt(Math.ceil((this.reqCount-this.disregard)/(this.totNode/1000.0)));
			this.tpNode = parseInt(Math.ceil(this.tpNginx*this.totNginx/this.totNode));
			this.calculating = false;
            ga('send', 'event', 'Simulation', 'Execution', 'Throughput', this.tpAngular);
        };
        AppSimulator.prototype.percValue = function() {
            return Math.ceil(this.reqOK * 100 / this.reqCount);
        };
		AppSimulator.prototype.calcPosition = function(hist) {
			return Math.ceil(this.reqOK * hist / 100);
		};
		AppSimulator.prototype.checkStop = function() {
			if (this.running >= this.reqCount) {
				this.duration = Date.now() - this.iniTime;
				this.calculating = true;
				var selfStop = this;
				setTimeout(function(){
					selfStop.calculateHistogram();
					selfStop.running = -1;
				}, 10);
				return true;
			}
			return false;
		};
		AppSimulator.prototype.throwHTTPrequests = function(i) {
			var self = this;
			var arrReq = [];
			for (var j = 0; ((j < this.reqConn) && (i + j < this.reqCount)); j++) {
				arrReq.push(this.requests[1][i + j]);
			}
			if (self.observableRequests) {
				self.observableRequests.unsubscribe();
				self.observableRequests = undefined;
			}
			self.observableRequests = Rx.Observable.forkJoin(arrReq).subscribe(
				function(response) {
					for (var k = 0; k < response.length; k++) {
						self.requests[0][response[k].reqId] = {
							rid: 'Request ' + (parseInt(response[k].reqId) + 1),
							hst: self.nodeIdx[response[k].json.hostname][0],
							rtt: response[k].rtt,
							tsn: response[k].tsn,
							exts: response[k].exts
						};
						var curRunning = ++self.running;
						self.reqOK++;
						if (!(response[k].json.pid in self.pidIdx[response[k].json.hostname])) {
							self.results[self.nodeIdx[response[k].json.hostname][0]][1].push([response[k].json.pid, []]);
							self.pidIdx[response[k].json.hostname][response[k].json.pid] = self.results[self.nodeIdx[response[k].json.hostname][0]][1].length - 1;
						}
						self.results[self.nodeIdx[response[k].json.hostname][0]][1][self.pidIdx[response[k].json.hostname][response[k].json.pid]][1].push(curRunning);
						self.nodeIdx[response[k].json.hostname][1]++;
					}
				},
				function(error) {
					self.running += self.reqConn;
					if (self.running > self.reqCount)
						self.running = self.reqCount;
					self.reqErrors++;
				},
				function() {
					self.observableRequests.unsubscribe();
					self.observableRequests = undefined;
					if (!self.checkStop()) {
						self.loopCon += self.reqConn;
						self.throwHTTPrequests(self.loopCon);
					}
				}
			);
		};
		AppSimulator.prototype.initSimulator = function() {
            this.reqOK = 0;
            this.reqErrors = 0;
            this.duration = 0;
            this.loopCon = 0;
            this.histogram = [[50,
			                   0],
			                  [75,
			                   0],
			                  [90,
			                   0],
			                  [95,
			                   0],
			                  [100,
			                   0]];
			this.requests = [[],
			                 []];
			this.results = [["raspberrypi2",
			                 []],
			                ["raspberrypi3",
			                 []],
			                ["raspberrypi5",
			                 []],
			                ["raspberrypi6",
			                 []]];
			this.nodeIdx = {
				"raspberrypi2": [0,
				                 0],
				"raspberrypi3": [1,
				                 0],
				"raspberrypi5": [2,
				                 0],
				"raspberrypi6": [3,
				                 0]
			};
			this.pidIdx = {
				"raspberrypi2": {},
				"raspberrypi3": {},
				"raspberrypi5": {},
				"raspberrypi6": {}
			};
			this.totAngular = 0;
			this.totNginx = 0;
			this.totNode = 0;
			this.tpAngular = 0;
			this.tpNginx = 0;
			this.tpNode = 0;
			this.observableRequests = undefined;
			for (var reqId = 0; reqId < this.reqCount; reqId++) {
				this.requests[0].push({rtt: 0, hst: '', rid: 0, tsn: 0, exts: 0});
				this.requests[1].push(this.httpService.get(reqId, this.selectedUrl));
			}
            this.running = 0;
            this.iniTime = Date.now();
            this.throwHTTPrequests(this.loopCon);
		};
		return AppSimulator;
	})();
})(window.app || (window.app = {}));
