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
			this.requests = [[],
			                 []];
            this.isDuration = false;
			this.reqConn = 4;
			this.reqCount = 100;
            this.reqDuration = 5;
            this.reqInterval = 50;
            this.timeStart = Date.now();
            this.running = false;
			this.reqErrors = 0;
			this.reqOK = 0;
			this.loopCon = 0;
			this.duration = 0;
			this.totAngular = 0;
			this.totNginx = 0;
			this.totNode = 0;
            this.totRedis = 0;
			this.tpAngular = 0;
			this.tpNginx = 0;
			this.tpNode = 0;
            this.tpRedis = 0;
            this.showReference = false;
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
						tickFormat:        function(d) {
							return d3.format('d')(d);
						}
					}
				}
			};
            this.lineChartOptions = {
                chart: {
                    type:         'lineWithFocusChart',
                    showControls: false,
                    height:       400,
                    showLegend:   true,
                    clipEdge:     true,
                    duration:     500,
                    margin:       {
                        top:    20,
                        right:  20,
                        bottom: 40,
                        left:   55
                    },
                    x:            function(d) { return d.x; },
                    y:            function(d) { return d.y; },
                    useInteractiveGuideline: true,
                    xAxis:       {
                        axisLabel: 'Percentile (%)'
                        // ,tickFormat:   function(d) {
                        //     return d3.format('.5f')(d);
                        // }
                    },
                    yAxis:       {
                        axisLabel:         'AngularJS Latency (ms)',
                        axisLabelDistance: -10,
                        rotateYLabel:      true
                    },
                    x2Axis:      {
                        // tickFormat: function(d) {
                        //     return d3.format('.5f')(d);
                        // }
                    },
                    y2Axis:      {},
                    brushExtent: [75,
                                  100]
                }
            };
			this.polarChartOptions = {
				chart: {
					type:          'pieChart',
                    height:        299,
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
                    height:        299,
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
            this.barChartData = [{key: 'raspberrypi2-redis', values: [{label: '', value: 0}]},
                                 {key: 'raspberrypi3-redis', values: [{label: '', value: 0}]},
                                 {key: 'raspberrypi5-redis', values: [{label: '', value: 0}]},
                                 {key: 'raspberrypi6-redis', values: [{label: '', value: 0}]},
                                 {key: 'raspberrypi2-node', values: [{label: '', value: 0}]},
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
            this.lineChartData = [
                {key: 'w/o Coord. Omission', values: [], area: false},
                {key: 'Latency/Percentile', values: [], area: true}
            ];
			this.observableRequests = undefined;
            this.links = {
                HTTP2:    {
                    title: "HTTP/2", anchor: [
                    {
                        href: 'https://http2.akamai.com/demo',
                        desc: 'HTTP/2: the Future of the Internet | Akamai'
                    },
                    {
                        href: 'https://http2.github.io',
	                    desc: "HTTP/2 Github repository"
                    },
                    {
                        href: 'https://http2.github.io/http2-spec/',
                        desc: 'Hypertext Transfer Protocol Version 2 (HTTP/2) draft-ietf-httpbis-http2-latest'
                    },
                    {
                        href: 'https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/present?slide=id.g4ec7b01d4_5_150',
                        desc: "HTTP/2 is here, let's optimize! - Velocity 2015 - Google Slides"
                    },
                    {
                        href: 'http://caniuse.com/#search=HTTP%2F2',
                        desc: 'Can I use... HTTP/2'
                    },
                    {
                        href: 'https://hpbn.co/http2/',
                        desc: "HTTP: HTTP/2 - High Performance Browser Networking (O'Reilly)"
                    },
                    {
                        href: 'https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/',
                        desc: 'Getting Ready For HTTP/2: A Guide For Web Designers And Developers'
                    },
                    {
                        href: 'http://qnimate.com/post-series/http2-complete-tutorial/',
                        desc: 'HTTP/2 Complete Tutorial'
                    },
                    {
                        href: 'http://javascriptplayground.com/blog/2016/03/http2-and-you/',
                        desc: 'HTTP/2 and You'
                    },
                    {
                        href: 'https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin',
                        desc: 'HTTP/2 and SPDY indicator'
                    }
                    ]
                },
                pm2:      {
                    title: "Keymetrics pm2 (v1.1.3)", anchor: [
                    {
                        href: "http://pm2.keymetrics.io/",
                        desc: "PM2 - Advanced Node.js process manager"
                    },
                    {
                        href: "http://pm2.keymetrics.io/docs/usage/cluster-mode/",
                        desc: "PM2 - Cluster Mode"
                    },
                    {
                        href: "https://keymetrics.io/",
                        desc: "Keymetrics I/O - Monitor and Augment Node.js"
                    },
                    {
                        href: "http://pm2.keymetrics.io/docs/usage/application-declaration/",
                        desc: "PM2 - Application Declaration"
                    },
                    {
                        href: "http://pm2.keymetrics.io/docs/usage/deployment/",
                        desc: "PM2 - Deployment"
                    }
                    ]
                },
                angular2: {
                    title: "AngularJS 2 (v2.0.0-rc3)", anchor: [
                    {href: "https://angular.io", desc: "One framework - Angular 2"},
                    {href: "https://angular.io/docs/js/latest/guide/cheatsheet.html", desc: "Angular Cheat Sheet - js"},
                    {href:    "https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.ttmhbubnd",
                        desc: "Angular 2 — Introduction to new HTTP module"
                    },
                    {href:    "http://blog.caelum.com.br/angularjs-seo-google-analytics-e-virtual-pages/",
                        desc: "AngularJS: SEO, Google Analytics e Virtual Pages"
                    },
                    {href:    "https://coryrylan.com/blog/angular-2-observable-data-services",
                        desc: "Angular 2 Observable Data Services"
                    },
                    {href:    "http://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html",
                        desc: "Taking advantage of Observables in Angular 2"
                    }
                    ]
                },
                ng2nvd3:  {
                    title: "ng2-nvd3 Charting Library (v1.1.1)", anchor: [
                    {href: "https://github.com/krispo/ng2-nvd3", desc: "Angular2 component for nvd3"}
                    ]
                },
                stunnel:  {
                    title: "stunnel (v5.32)", anchor: [
                    {href:    "https://www.stunnel.org/index.html",
                        desc: "Stunnel - a proxy designed to add TLS encryption functionality to existing clients and servers"
                    },
                    {href:    "http://bencane.com/2014/02/18/sending-redis-traffic-through-an-ssl-tunnel-with-stunnel/",
                        desc: "Sending redis traffic through an SSL tunnel with stunnel"
                    }
                    ]
                },
                github:   {
                    title: "GitHub", anchor: [
                    {href:    "https://github.com/giancarlobonansea/clusterednode-client",
                        desc: "NLB HA Clustered Node PoC - Client app"
                    },
                    {href:    "https://github.com/giancarlobonansea/clusterednode-worker",
                        desc: "NLB HA Clustered Node PoC - Worker process"
                    },
                    {href:    "https://github.com/giancarlobonansea/clusterednode-hdrhist",
                        desc: "NLB HA Clustered Node PoC - HDR Histogram service"
                    },
                    {href:    "https://github.com/giancarlobonansea/clusterednode-config",
                        desc: "NLB HA Clustered Node PoC - Configuration files"
                    }
                    ]
                },
                nginx:    {
                    title: "nginX (opensource v1.11.1)", anchor: [
                    {
                        href: "https://www.nginx.com/blog/7-tips-for-faster-http2-performance/",
                        desc: "7 Tips for Faster HTTP/2 Performance"
                    },
                    {
                        href: "https://www.quora.com/How-can-nginx-handle-concurrent-requests-with-a-single-worker-process",
                        desc: "How can nginx handle concurrent requests with a single worker process?"
                    },
                    {
                        href: "https://www.nginx.com/resources/admin-guide/load-balancer/",
                        desc: "NGINX Load Balancing - HTTP and TCP Load Balancer"
                    },
                    {
                        href: "https://serversforhackers.com/so-you-got-yourself-a-loadbalancer",
                        desc: "So You Got Yourself a Loadbalancer"
                    },
                    {
                        href: "http://www.aosabook.org/en/nginx.html",
                        desc: "The Architecture of Open Source Applications (Volume 2): nginx"
                    },
                    {
                        href: "https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/",
                        desc: "Inside NGINX: How We Designed for Performance & Scale"
                    },
                    {
                        href: "https://www.nginx.com/blog/introducing-the-nginx-microservices-reference-architecture/",
                        desc: "Introducing the Microservices Reference Architecture from NGINX"
                    },
                    {
                        href: "https://www.nginx.com/blog/building-microservices-using-an-api-gateway/",
                        desc: "Building Microservices: Using an API Gateway"
                    },
                    {
                        href: "http://www.slideshare.net/joshzhu/nginx-internals",
                        desc: "nginX Internals - slide presentation"
                    },
                    {
                        href: "http://www.thegeekstuff.com/2013/11/nginx-vs-apache/?utm_source=tuicool",
                        desc: "Nginx Vs Apache: Nginx Basic Architecture and Scalability"
                    },
                    {
                        href: "https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations",
                        desc: "Apache vs Nginx: Practical Considerations"
                    },
                    {
                        href: "http://www.linuxbrigade.com/reduce-time_wait-socket-connections/",
                        desc: "Reduce TIME_WAIT socket connections"
                    },
                    {
                        href: "https://vincent.bernat.im/en/blog/2014-tcp-time-wait-state-linux.html",
                        desc: "Coping with the TCP TIME-WAIT state on busy Linux servers"
                    },
                    {
                        href: "https://easyengine.io/tutorials/linux/sysctl-conf/",
                        desc: "Performance - Sysctl Tweaks"
                    },
                    {
                        href: "https://tweaked.io/guide/kernel/",
                        desc: "Tweaked.io making your servers fly"
                    },
                    {
                        href: "https://www.nginx.com/blog/nginx-load-balance-deployment-models/",
                        desc: "NGINX Load Balancing Deployment Scenarios"
                    }
                    ]
                },
                hdr:      {
                    title: "HDR Histograms w/o Coordinated Omission (v2.1.9)", anchor: [
                    {
                        href: "http://bravenewgeek.com/everything-you-know-about-latency-is-wrong/",
                        desc: "Everything You Know About Latency Is Wrong"
                    },
                    {
                        href: "http://hdrhistogram.org/",
                        desc: "HdrHistogram: A High Dynamic Range Histogram"
                    },
                    {
                        href: "https://github.com/giltene/wrk2",
                        desc: "wrk2 - a HTTP benchmarking tool based mostly on wrk"
                    },
                    {
                        href: "https://www.npmjs.com/package/native-hdr-histogram",
                        desc: "node.js bindings for hdr histogram C implementation"
                    },
                    {
                        href: "http://psy-lob-saw.blogspot.com.br/2015/02/hdrhistogram-better-latency-capture.html",
                        desc: "HdrHistogram: A better latency capture method"
                    },
                    {
                        href: "https://www.youtube.com/watch?v=6Rs0p3mPNr0",
                        desc: "How NOT to measure latency - Gil Tene"
                    },
                    {
                        href: "https://nirajrules.wordpress.com/2009/09/17/measuring-performance-response-vs-latency-vs-throughput-vs-load-vs-scalability-vs-stress-vs-robustness/",
                        desc: "Performance Testing – Response vs. Latency vs. Throughput vs. Load vs. Scalability vs. Stress vs. Robustness"
                    }
                    ]
                },
                redis:    {
                    title: "redis.io (v3.2.1)", anchor: [
                    {
                        href: "http://redis.io/",
                        desc: "redis.io - open source in-memory data structure store (database, cache and message broker)"
                    },
                    {
                        href: "http://redis.js.org/",
                        desc: "REDIS - A Node.js redis client"
                    },
                    {
                        href: "http://redis.io/topics/rediscli",
                        desc: "redis-cli, the Redis command line interface"
                    },
                    {
                        href: "http://bluebirdjs.com/docs/getting-started.html",
                        desc: "Bluebird - full featured promise library with unmatched performance"
                    },
                    {
                        href: "http://redis.io/topics/latency",
                        desc: "Redis latency problems troubleshooting"
                    },
                    {
                        href: "http://redis.io/topics/latency-monitor",
                        desc: "Redis latency monitoring framework"
                    },
                    {
                        href: "https://www.datadoghq.com/blog/how-to-collect-redis-metrics/",
                        desc: "How to collect Redis metrics"
                    },
                    {
                        href: "https://www.datadoghq.com/wp-content/uploads/2013/09/Understanding-the-Top-5-Redis-Performance-Metrics.pdf",
                        desc: "Understanding the Top 5 Redis Performance Metrics"
                    },
                    {
                        href: "http://www.iamtherealbill.com/2014/12/redis-performance-thoughts-2/",
                        desc: "More Thoughts on Redis Performance"
                    }
                    ]
                },
                node:     {
                    title: "Node.js (v6.2.2)", anchor: [
                    {
                        href: "https://nodejs.org/en/",
                        desc: "Node.js - a JavaScript runtime built on Chrome's V8 JavaScript engine"
                    },
                    {
                        href: "http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/",
                        desc: "Beginner’s Guide to Installing Node.js on a Raspberry Pi"
                    },
                    {
                        href: "http://blog.keithcirkel.co.uk/load-balancing-node-js/",
                        desc: "Load balancing Node.js"
                    },
                    {
                        href: "https://www.npmjs.com/package/http2",
                        desc: "An HTTP/2 client and server implementation"
                    }
                    ]
                },
                ga:       {
                    title: "Google Analytics", anchor: [
                        {
                            href: "https://analytics.google.com/",
                            desc: "Google Analytics"
                        }
                    ]
                }
            };
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
            if (this.isDuration) {
                this.reqDuration = 5;
                this.reqInterval = 50;
                this.reqConn = 4;
            }
            else {
                this.reqCount = 100;
                this.reqConn = 4;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Small Preset');
		};
		AppSimulator.prototype.setMedium = function() {
            if (this.isDuration) {
                this.reqDuration = 10;
                this.reqInterval = 20;
                this.reqConn = 16;
            }
            else {
                this.reqCount = 512;
                this.reqConn = 16;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Medium Preset');
        };
		AppSimulator.prototype.setLarge = function() {
            if (this.isDuration) {
                this.reqDuration = 30;
                this.reqInterval = 15;
                this.reqConn = 64;
            }
            else {
                this.reqCount = 1024;
                this.reqConn = 64;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Large Preset');
        };
		AppSimulator.prototype.setHuge = function() {
            if (this.isDuration) {
                this.reqDuration = 60;
                this.reqInterval = 10;
                this.reqConn = 128;
            }
            else {
                this.reqCount = 2048;
                this.reqConn = 128;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Huge Preset');
        };
        AppSimulator.prototype.setDuration = function() {
            this.isDuration = true;
        };
        AppSimulator.prototype.setRequests = function() {
            this.isDuration = false;
        };
        AppSimulator.prototype.isDurationMethod = function() {
            return this.isDuration;
        };
        AppSimulator.prototype.isRequestMethod = function() {
            return !this.isDuration;
        };
		AppSimulator.prototype.perc = function(p) {
			var curPerc = Math.ceil(this.reqOK * 12 / this.reqCount);
			return (curPerc>=p);
		};
		AppSimulator.prototype.isRunning = function() {
            return this.running;
		};
		AppSimulator.prototype.calculateHistogram = function() {
            this.barChartData = [{key: 'raspberrypi2-redis', values: []},
                                 {key: 'raspberrypi3-redis', values: []},
                                 {key: 'raspberrypi5-redis', values: []},
                                 {key: 'raspberrypi6-redis', values: []},
                                 {key: 'raspberrypi2-node', values: []},
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
            this.lineChartData = [
                {key: 'w/o Coord. Omission', values: [], area: false},
                {key: 'Latency/Percentile', values: [], area: true}
            ];
			this.disregard = parseInt(Math.ceil(this.reqCount * 4.55 / 100.0));
			this.discardLower = Math.floor(this.disregard/2);
			this.discardUpper = this.reqCount-Math.ceil(this.disregard/2)-1;
            //
            // Populate barchart as processed (no sorting)
            //
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
                var red2 = this.requests[0][i].hst === 0 ? this.requests[0][i].red : 0;
                var red3 = this.requests[0][i].hst === 1 ? this.requests[0][i].red : 0;
                var red5 = this.requests[0][i].hst === 2 ? this.requests[0][i].red : 0;
                var red6 = this.requests[0][i].hst === 3 ? this.requests[0][i].red : 0;
                this.barChartData[0].values.push({label: this.requests[0][i].rid, value: Math.ceil(red2)});
                this.barChartData[1].values.push({label: this.requests[0][i].rid, value: Math.ceil(red3)});
                this.barChartData[2].values.push({label: this.requests[0][i].rid, value: Math.ceil(red5)});
                this.barChartData[3].values.push({label: this.requests[0][i].rid, value: Math.ceil(red6)});
                this.barChartData[4].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts2 - red2)});
                this.barChartData[5].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts3 - red3)});
                this.barChartData[6].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts5 - red5)});
                this.barChartData[7].values.push({label: this.requests[0][i].rid, value: Math.ceil(exts6 - red6)});
                this.barChartData[8].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn2 - exts2)});
                this.barChartData[9].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn3 - exts3)});
                this.barChartData[10].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn5 - exts5)});
                this.barChartData[11].values.push({label: this.requests[0][i].rid, value: Math.floor(tsn6 - exts6)});
                this.barChartData[12].values.push({label: this.requests[0][i].rid, value: rtt2 - tsn2});
                this.barChartData[13].values.push({label: this.requests[0][i].rid, value: rtt3 - tsn3});
                this.barChartData[14].values.push({label: this.requests[0][i].rid, value: rtt5 - tsn5});
                this.barChartData[15].values.push({label: this.requests[0][i].rid, value: rtt6 - tsn6});
            }
            //
            // HDR by RTT (AngularJS time)
            //
            var hdrRTTpost = {"arr": []};
            for (var n = 0; n < this.requests[0].length; n++) {
                hdrRTTpost.arr.push(this.requests[0][n].rtt);
            }
            //
            // Sorting by RTT (AngularJS time)
            //
			this.totReqAng = [0,0,0,0];
			this.requests[0].sort(function(a, b) {return a.rtt - b.rtt});
			for (var i = 0; i < this.requests[0].length; i++) {
                rtt2 = this.requests[0][i].hst === 0 ? this.requests[0][i].rtt : 0;
                rtt3 = this.requests[0][i].hst === 1 ? this.requests[0][i].rtt : 0;
                rtt5 = this.requests[0][i].hst === 2 ? this.requests[0][i].rtt : 0;
                rtt6 = this.requests[0][i].hst === 3 ? this.requests[0][i].rtt : 0;
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
			this.tpAngular = parseInt(Math.ceil(this.reqCount/(this.duration/1000)));
			for (i = 0; i < this.histogram.length; i++) {
				this.histogram[i][1] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].rtt;
            }
			//
			// Sorting by TSN (nginX time)
			//
			this.totReqNgi = [0,0,0,0];
			this.requests[0].sort(function(a, b) {return a.tsn - b.tsn});
			for (i = 0; i < this.histogram.length; i++) {
				this.histogram[i][2] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].tsn;
            }
			for (i = 0; i < this.requests[0].length; i++) {
                tsn2 = this.requests[0][i].hst === 0 ? this.requests[0][i].tsn : 0;
                tsn3 = this.requests[0][i].hst === 1 ? this.requests[0][i].tsn : 0;
                tsn5 = this.requests[0][i].hst === 2 ? this.requests[0][i].tsn : 0;
                tsn6 = this.requests[0][i].hst === 3 ? this.requests[0][i].tsn : 0;
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
			this.tpNginx = parseInt(Math.ceil(this.tpAngular*this.totAngular/this.totNginx));
			//
			// Sort by EXTS (nodeJS time)
			//
			this.requests[0].sort(function(a, b) {return a.exts - b.exts});
			for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][3] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].exts;
            }
			for (i = 0; i < this.requests[0].length; i++) {
				this.totNode += ((i>=this.discardLower)&&(i<=this.discardUpper))?this.requests[0][i].exts:0;
			}
			this.tpNode = parseInt(Math.ceil(this.tpNginx*this.totNginx/this.totNode));
            //
            // Sort by RED (redis.io time)
            //
            this.requests[0].sort(function(a, b) {return a.red - b.red});
            for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][4] = this.requests[0][Math.ceil(this.reqCount * this.histogram[i][0] / 100) - 1].red;
            }
            for (i = 0; i < this.requests[0].length; i++) {
                this.totRedis += ((i >= this.discardLower) && (i <= this.discardUpper)) ? this.requests[0][i].red : 0;
            }
            this.tpRedis = parseInt(Math.ceil(this.tpNode * this.totNode / this.totRedis));
            //
            // Calculating HDR Histogram
            //
            this.hdrRTTresults = {table: [], chart: []};
			this.lineChartData[0].values = [];
			this.lineChartData[1].values = [];
            var selfRTT = this;
            this.observableRTT = this.httpService.post(this.urlHDR, JSON.stringify(hdrRTTpost)).subscribe(
                function(response) {
                    selfRTT.hdrRTTresults = response;
	                selfRTT.requests[0].sort(function(a, b) {return a.rtt - b.rtt});
	                for (var n = 0; n < selfRTT.hdrRTTresults.chart.length; n++) {
		                selfRTT.lineChartData[0].values.push({
			                                                     x: selfRTT.hdrRTTresults.chart[n].percentile,
			                                                     y: selfRTT.hdrRTTresults.chart[n].value
		                                                     });
		                selfRTT.lineChartData[1].values.push({
			                                                     x: selfRTT.hdrRTTresults.chart[n].percentile,
			                                                     y: selfRTT.requests[0][parseInt(Math.floor(selfRTT.hdrRTTresults.chart[n].percentile * selfRTT.reqOK / 100)) - 1].rtt
		                                                     });
	                }
                },
                function(error) {
                    console.log("HDR Service error");
                },
                function() {
                    selfRTT.observableRTT.unsubscribe();
                    selfRTT.observableRTT = undefined;
	                selfRTT.calculating = false;
                    selfRTT.running = false;
                }
            );
            ga('send', 'event', 'Simulation', 'Execution', 'Throughput', this.tpAngular);
        };
        AppSimulator.prototype.onRefLink = function(title, desc) {
            ga('send', 'event', 'Reference', title, desc);
        };
        AppSimulator.prototype.percValue = function() {
            return Math.ceil(this.reqOK * 100 / this.reqCount);
        };
		AppSimulator.prototype.calcPosition = function(hist) {
			return Math.ceil(this.reqOK * hist / 100);
		};
		AppSimulator.prototype.checkStop = function() {
            if (this.reqOK + this.reqErrors >= this.reqCount) {
				this.duration = Date.now() - this.iniTime;
				this.calculating = true;
				var selfStop = this;
				setTimeout(function(){
					selfStop.calculateHistogram();
                }, 500);
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
			self.observableRequests = Rx.Observable.forkJoin(arrReq).subscribe(
				function(response) {
					for (var k = 0; k < response.length; k++) {
						self.requests[0][response[k].reqId] = {
							rid:  'Request ' + (parseInt(response[k].reqId) + 1),
							hst:  self.nodeIdx[response[k].json.hostname][0],
							rtt:  response[k].rtt,
							tsn:  response[k].tsn,
                            exts: response[k].exts,
                            red:  response[k].red
						};
						if (!(response[k].json.pid in self.pidIdx[response[k].json.hostname])) {
							self.results[self.nodeIdx[response[k].json.hostname][0]][1].push([response[k].json.pid, []]);
							self.pidIdx[response[k].json.hostname][response[k].json.pid] = self.results[self.nodeIdx[response[k].json.hostname][0]][1].length - 1;
						}
                        self.results[self.nodeIdx[response[k].json.hostname][0]][1][self.pidIdx[response[k].json.hostname][response[k].json.pid]][1].push(++self.reqOK);
						self.nodeIdx[response[k].json.hostname][1]++;
					}
				},
				function(error) {
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
        AppSimulator.prototype.throwHTTPduration = function() {
            var self  = this,
                reqId = 0;
            self.timerRunning = true;
            self.requestsQueue = 0;
            self.iniTime = Date.now();
            self.intervalHandler = setInterval(function() {
                var arrReq = [];
                for (var j = 0; j < self.reqConn; j++) {
                    self.requests[0].push({rtt: 0, hst: '', rid: 0, tsn: 0, exts: 0, red: 0});
                    self.requests[1].push(self.httpService.get(reqId, self.selectedUrl));
                    arrReq.push(self.requests[1][reqId]);
                    reqId++;
                }
                ++self.requestsQueue;
                var observableRequestsA = Rx.Observable.forkJoin(arrReq).subscribe(
                    function(response) {
                        for (var k = 0; k < response.length; k++) {
                            self.requests[0][response[k].reqId] = {
                                rid:  'Request ' + (parseInt(response[k].reqId) + 1),
                                hst:  self.nodeIdx[response[k].json.hostname][0],
                                rtt:  response[k].rtt,
                                tsn:  response[k].tsn,
                                exts: response[k].exts,
                                red:  response[k].red
                            };
                            if (!(response[k].json.pid in self.pidIdx[response[k].json.hostname])) {
                                self.results[self.nodeIdx[response[k].json.hostname][0]][1].push([response[k].json.pid,
                                                                                                  []]);
                                self.pidIdx[response[k].json.hostname][response[k].json.pid] = self.results[self.nodeIdx[response[k].json.hostname][0]][1].length - 1;
                            }
                            self.results[self.nodeIdx[response[k].json.hostname][0]][1][self.pidIdx[response[k].json.hostname][response[k].json.pid]][1].push(++self.reqOK);
                            self.nodeIdx[response[k].json.hostname][1]++;
                        }
                    },
                    function(error) {
                        self.reqErrors++;
                    },
                    function() {
                        observableRequestsA.unsubscribe();
                        observableRequestsA = undefined;
                        --self.requestsQueue;
                        if (!self.timerRunning && self.requestsQueue === 0) {
                            self.reqCount = self.reqOK + self.reqErrors;
                            self.duration = Date.now() - self.iniTime;
                            self.calculating = true;
                            var selfStop = self;
                            setTimeout(function() {
                                selfStop.calculateHistogram();
                            }, 500);
                        }
                    }
                );
            }, self.reqInterval);
            setTimeout(function() {
                if (self.intervalHandler) {
                    clearInterval(self.intervalHandler);
                }
                self.timerRunning = false;
            }, self.reqDuration * 1000);
        };
        AppSimulator.prototype.showRef = function() {
            this.showReference = !this.showReference;
        };
		AppSimulator.prototype.initSimulator = function() {
            this.showReference = false;
            this.reqOK = 0;
            this.reqErrors = 0;
            this.duration = 0;
            this.loopCon = 0;
            this.histogram = [[50,
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
            this.totRedis = 0;
			this.tpAngular = 0;
			this.tpNginx = 0;
			this.tpNode = 0;
            this.tpRedis = 0;
			this.observableRequests = undefined;
            this.running = true;
            if (this.isDuration) {
                this.throwHTTPduration();
            }
            else {
                for (var reqId = 0; reqId < this.reqCount; reqId++) {
                    this.requests[0].push({rtt: 0, hst: '', rid: 0, tsn: 0, exts: 0, red: 0});
                    this.requests[1].push(this.httpService.get(reqId, this.selectedUrl));
                }
                this.iniTime = Date.now();
                this.throwHTTPrequests(this.loopCon);
            }
		};
		return AppSimulator;
	})();
})(window.app || (window.app = {}));
