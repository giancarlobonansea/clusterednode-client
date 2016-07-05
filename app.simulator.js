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
            this.reqConn = 2;
			this.reqCount = 100;
            this.reqDuration = 5;
            this.reqInterval = 50;
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
            this.operAcro = ['G',
                             'S',
                             'P',
                             'T'];
            this.operationProb = [0,
                                  0,
                                  0,
                                  0,
                                  0,
                                  0,
                                  0,
                                  1,
                                  2,
                                  3];
            this.showReference = false;
			this.calculating = false;
            this.liveEvents = false;
			this.httpService = HTTPService;
			this.urlOptions = [['https://giancarlobonansea.homeip.net:33333/api',
			                    'DNS Public'],
			                   ['https://raspberrypi4:8010/api',
			                    'DNS Private'],
			                   ['https://192.168.69.242:8010/api',
			                    'IP Private']];
            this.nodes = ["raspberrypi2",
                          "raspberrypi3",
                          "raspberrypi5",
                          "raspberrypi6"];
            this.urlHDR = 'https://giancarlobonansea.homeip.net:33333/hdr';
			this.selectedUrl = this.urlOptions[0][0];
            this.initEVMatrix();
            this.socket = io('https://giancarlobonansea.homeip.net:33331');
            this.liveTTL = 500;
            var selfMtx = this;
            // Receive redis.io realtime info
            this.socket.on('redis', function(data) {
                var x = data.x,
                    y = data.y;
                if (selfMtx.evMatrix[x][y] !== 3) {
                    selfMtx.evMatrix[x][y] = 3;
                    setTimeout(function() {
                        selfMtx.evMatrix[x][y] = selfMtx.mapDBmatrix(x, y);
                    }, selfMtx.liveTTL);
                }
            });
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
			this.polarChartOptions2 = {
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
                HTTP2: {
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
                    },
                    {
                        href: "http://www.aosabook.org/en/posa/secrets-of-mobile-network-performance.html",
                        desc: "Secrets of Mobile Network Performance"
                    }
                    ]
                },
                net:   {
                    "title": "Advanced Networking", anchor: [
                        {
                            href: "http://linuxgazette.net/135/pfeiffer.html",
                            desc: "TCP and Linux' Pluggable Congestion Control Algorithms"
                        },
                        {
                            href: "http://sgros.blogspot.com.br/2012/12/controlling-which-congestion-control.html",
                            desc: "Controlling which congestion control algorithm is used in Linux"
                        },
                        {
                            href: "https://en.wikipedia.org/wiki/TCP_congestion_control",
                            desc: "TCP congestion control"
                        },
                        {
                            href: "http://elinux.org/Raspberry_Pi_Kernel_Compilation#Build_modules_for_the_running_kernel",
                            desc: "Build modules for the running Linux kernel"
                        },
                        {
                            href: "https://fasterdata.es.net/host-tuning/linux/",
                            desc: "Linux Tunning - TCP tunning"
                        },
                        {
                            href: "http://shokunin.co/blog/2014/11/11/operational_redis.html",
                            desc: "Running Redis in production - network and CPU balancing"
                        },
                        {
                            href: "https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/network-rps.html",
                            desc: "RPS - Receive Packet Steering for network performance"
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
                            href: "https://lwn.net/Articles/616241/",
                            desc: "A damp discussion of network queuing - fq_codel"
                        },
                        {
                            href: "https://www.bufferbloat.net/projects/codel/wiki/",
                            desc: "CoDel Overview"
                        },
                        {
                            href: "https://wiki.mikejung.biz/Sysctl_tweaks",
                            desc: "Sysctl tweaks"
                        },
                        {
                            href: "https://en.wikipedia.org/wiki/Bufferbloat",
                            desc: "Bufferbloat - the problem"
                        },
                        {
                            href: "http://www.satnac.org.za/proceedings/2012/papers/2.Core_Network_Technologies/15.pdf",
                            desc: "TCP Congestion Control Comparison (University of Stellenbosch)"
                        },
                        {
                            href: "http://research.microsoft.com/en-us/um/redmond/events/tcpsummit/Slides/ms_feb07_eval.ppt.pdf",
                            desc: "Evaluating New TCP Congestion Control Algorithms"
                        },
                        {
                            href: "https://tools.ietf.org/html/rfc6937",
                            desc: "IETF RFC6937 - Proportional Rate Reduction for TCP"
                        },
                        {
                            href: "https://blog.cloudflare.com/optimizing-the-linux-stack-for-mobile-web-per/",
                            desc: "Optimizing Your Linux Stack for Maximum Mobile Web Performance"
                        },
                        {
                            href: "http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37486.pdf",
                            desc: "Google's Proportional Rate Reduction for TCP"
                        },
                        {
                            href: "http://airccse.org/journal/nsa/0912nsa02.pdf",
                            desc: "Comparison of high speed congestion control protocols"
                        },
                        {
                            href: "http://193.204.59.68/mascolo/tcp%20westwood/Tech_Rep_07_03_S.pdf",
                            desc: "Performance Comparison of Reno, Vegas and Westwood+ TCP Congestion Control"
                        },
                        {
                            href: "http://www.linux-magazine.com/Issues/2015/175/FQ-CoDel-and-MPTCP",
                            desc: "Speeding up mobile networks with FQ CoDel and MPTCP"
                        },
                        {
                            href: "https://blog.cloudflare.com/how-to-receive-a-million-packets/",
                            desc: "How to receive a million packets per second"
                        },
                        {
                            href: "https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html-single/Performance_Tuning_Guide/",
                            desc: "Linux - Performance Tuning Guide"
                        },
                        {
                            href: "http://www.cubrid.org/blog/dev-platform/understanding-tcp-ip-network-stack/",
                            desc: "Understanding TCP/IP Network Stack & Writing Network Apps"
                        },
                        {
                            href: "http://datacratic.com/site/blog/1m-qps-nginx-and-ubuntu-1204-ec2",
                            desc: "1M QPS WITH NGINX"
                        },
                        {
                            href: "https://greenhost.net/2013/04/10/multi-queue-network-interfaces-with-smp-on-linux/",
                            desc: "Multi-queue network interfaces with SMP on Linux"
                        },
                        {
                            href: "https://blog.cloudflare.com/single-rx-queue-kernel-bypass-with-netmap/",
                            desc: "Single RX queue kernel bypass in Netmap for high packet rate networking"
                        },
                        {
                            href: "http://balodeamit.blogspot.com.br/2013/10/receive-side-scaling-and-receive-packet.html",
                            desc: "Receive Side Scaling and Receive Packet Steering"
                        },
                        {
                            href: "http://blog.packagecloud.io/eng/2016/06/22/monitoring-tuning-linux-networking-stack-receiving-data/",
                            desc: "Monitoring and Tuning the Linux Networking Stack: Receiving Data"
                        },
                        {
                            href: "http://rhelblog.redhat.com/2015/09/29/pushing-the-limits-of-kernel-networking/",
                            desc: "Pushing the Limits of Kernel Networking"
                        }
                    ]
                },
                pm2:   {
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
                    title: "AngularJS 2 (v2.0.0-rc4)", anchor: [
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
                    title: "stunnel (v5.33)", anchor: [
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
                        {
                            href: "https://github.com/giancarlobonansea/clusterednode-pubsub",
                            desc: "NLB HA Clustered Node PoC - Pub/Sub Redis service"
                        },
                        {href:    "https://github.com/giancarlobonansea/clusterednode-config",
                        desc: "NLB HA Clustered Node PoC - Configuration files"
                    }
                    ]
                },
                nginx:    {
                    title: "nginX (v1.11.1)", anchor: [
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
                    },
                    {
                        href: "http://redis.io/topics/cluster-tutorial",
                        desc: "Redis cluster tutorial"
                    },
                    {
                        href: "http://redis.io/topics/cluster-spec",
                        desc: "Redis Cluster Specification"
                    },
                    {
                        href: "http://redis.io/commands",
                        desc: "Redis Command Sheet"
                    },
                    {
                        href: "http://redis.io/presentation/Redis_Cluster.pdf",
                        desc: "Redis Cluster - a pragmatic approach to distribution"
                    },
                    {
                        href: "https://github.com/luin/ioredis",
                        desc: "A robust, performance-focused and full-featured Redis client for Node"
                    },
                    {
                        href: "https://github.com/luin/ioredis/wiki/Improve-Performance",
                        desc: "ioredis - Improve Performance"
                    },
                    {
                        href: "https://github.com/thunks/thunk-redis",
                        desc: "The fastest thunk/promise-based redis client, support all redis features"
                    },
                    {
                        href: "https://github.com/twitter/twemproxy",
                        desc: "A fast, light-weight proxy for memcached and redis"
                    },
                    {
                        href: "http://engineering.bloomreach.com/the-evolution-of-fault-tolerant-redis-cluster/",
                        desc: "The Evolution of Fault Tolerant Redis Cluster"
                    },
                    {
                        href: "http://www.iamtherealbill.com/2015/04/clusterizing-redis-intro/",
                        desc: "A Primer on Clusterizing Redis"
                    },
                    {
                        href: "http://redis.io/topics/distlock",
                        desc: "Distributed locks with Redis"
                    },
                    {
                        href: "http://redis.io/topics/notifications",
                        desc: "Redis Keyspace Notifications"
                    },
                    {
                        href: "https://www.infoq.com/presentations/Real-Time-Delivery-Twitter",
                        desc: "redis use-cases: Real-Time Delivery Architecture at Twitter"
                    },
                    {
                        href: "http://code.flickr.net/2011/10/11/talk-real-time-updates-on-the-cheap-for-fun-and-profit/",
                        desc: "redis use-cases: Flickr - Real-time Updates on the Cheap for Fun and Profit"
                    }]
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
                    },
                    {
                        href: "http://nodeschool.io/",
                        desc: "NodeSchool.io - Node.js concepts via interactive command-line games"
                    },
                    {
                        href: "https://nodejs.org/static/documents/casestudies/Nodejs-at-Uber.pdf",
                        desc: "How Uber Uses Node.js to Scale Their Business"
                    },
                    {
                        href: "https://www.youtube.com/watch?v=p74282nDMX8",
                        desc: "Node.js at Netflix"
                    },
                    {
                        href: "https://www.youtube.com/watch?v=ElI5QtUISWM",
                        desc: "Node.js at Uber"
                    },
                    {
                        href: "https://www.youtube.com/watch?v=-00ImeLt9ec",
                        desc: "Node.js at PayPal"
                    },
                    {
                        href: "https://www.youtube.com/watch?v=BJPeLJhv1Ic",
                        desc: "Node.js at CapitalOne"
                    },
                    {
                        href: "http://blog.trevnorris.com/2013/07/measuring-node-performance-part-1.html",
                        desc: "Measuring node performance"
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
                },
                quic:     {
                    title:  "Google QUIC",
                    anchor: [
                        {
                            href: "https://en.wikipedia.org/wiki/QUIC",
                            desc: "QUIC (Quick UDP Internet Connections)"
                        },
                        {
                            href: "https://docs.google.com/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34/edit",
                            desc: "QUIC: Design Document and Specification Rationale"
                        },
                        {
                            href: "https://docs.google.com/document/d/1lmL9EF6qKrk7gbazY8bIdvq3Pno2Xj_l_YShP40GLQE/edit",
                            desc: "QUIC FAQ for Geeks"
                        },
                        {
                            href: "https://www.youtube.com/watch?v=hQZ-0mXFmk8",
                            desc: "QUIC: next generation multiplexed transport over UDP"
                        },
                        {
                            href: "http://c3lab.poliba.it/images/3/3b/QUIC_SAC15.pdf",
                            desc: "HTTP over UDP: an Experimental Investigation of QUIC"
                        },
                        {
                            href: "https://www.chromium.org/quic",
                            desc: "QUIC, a multiplexed stream transport over UDP"
                        },
                        {
                            href: "http://blog.chromium.org/2015/04/a-quic-update-on-googles-experimental.html",
                            desc: "A QUIC update on Google’s experimental transport"
                        }
                    ]
                },
                open:     {
                    title:  "Open Source architectures",
                    anchor: [
                        {
                            href: "http://www.aosabook.org/en/index.html",
                            desc: "The Architecture of Open Source Applications"
                        },
                        {
                            href: "https://www.youtube.com/watch?v=jm75pxsb80c",
                            desc: "Microservice Developer Experience"
                        },
                        {
                            href: "https://www.youtube.com/watch?v=SYNJFX0oIBU",
                            desc: "Node.js for Enterprise APIs Panel Discussion"
                        },
                        {
                            href: "https://www.youtube.com/watch?v=D9TUU5bK0iE",
                            desc: "Rebuilding the Ship as it Sails: Making Large Legacy Sites Responsive"
                        },
                        {
                            href: "https://strongloop.com/",
                            desc: "Strongloop - Compose APIs, Build, Deploy and Monitor Node"
                        },
                        {
                            href: "https://www.mnot.net/cache_docs/",
                            desc: "Caching tutorial for Web Authors"
                        }
                    ]
                },
                openssl:  {
                    title:  "OpenSSL (v1.0.2h)",
                    anchor: [
                        {
                            href: "https://www.openssl.org/",
                            desc: "OpenSSL - Cryptography and SSL/TLS Toolkit"
                        }
                    ]
                },
                socket:   {
                    title:  "Socket.IO (v1.4.8)",
                    anchor: [
                        {
                            href: "http://socket.io/blog/",
                            desc: "Socket.IO - THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE"
                        },
                        {
                            href: "http://stackoverflow.com/questions/19496790/drop-packets-if-falling-behind-with-socket-io-in-node-js",
                            desc: "How to handle dropping packets on volatile messages"
                        },
                        {
                            href: "http://blog.mixu.net/2011/11/22/performance-benchmarking-socket-io-0-8-7-0-7-11-and-0-6-17-and-nodes-native-tcp/",
                            desc: "Performance benchmarking Socket.io 0.8.7, 0.7.11 and 0.6.17 and Node's native TCP"
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
                this.reqConn = 2;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Small Preset');
		};
		AppSimulator.prototype.setMedium = function() {
            if (this.isDuration) {
                this.reqDuration = 10;
                this.reqInterval = 30;
                this.reqConn = 4;
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
                this.reqInterval = 25;
                this.reqConn = 4;
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
                this.reqInterval = 25;
                this.reqConn = 8;
            }
            else {
                this.reqCount = 2048;
                this.reqConn = 128;
            }
            ga('send', 'event', 'Simulation', 'Configuration', 'Huge Preset');
        };
        AppSimulator.prototype.setDuration = function() {
            this.isDuration = true;
            this.setSmall();
        };
        AppSimulator.prototype.setRequests = function() {
            this.isDuration = false;
            this.setSmall();
        };
        AppSimulator.prototype.isDurationMethod = function() {
            return this.isDuration;
        };
        AppSimulator.prototype.isRequestMethod = function() {
            return !this.isDuration;
        };
        AppSimulator.prototype.usedDurationMethod = function() {
            return this.execMode === 'STABILITY';
        };
        AppSimulator.prototype.usedRequestMethod = function() {
            return this.execMode === 'STRESS';
        };
        AppSimulator.prototype.getSimulationMethod = function() {
            return this.isDuration ? 'STABILITY' : 'STRESS';
        };
        AppSimulator.prototype.getNumCol = function() {
            return this.isDuration ? 3 : 2;
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
            this.disregard = Math.ceil(this.reqExecuted * 4.55 / 100.0);
			this.discardLower = Math.floor(this.disregard/2);
            this.discardUpper = this.reqExecuted - Math.ceil(this.disregard / 2) - 1;
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
            for (i = 0; i < this.requests[0].length; i++) {
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
            this.tpAngular = Math.ceil(this.reqExecuted / (this.duration / 1000));
			for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][1] = this.requests[0][Math.ceil(this.reqExecuted * this.histogram[i][0] / 100) - 1].rtt;
            }
			//
			// Sorting by TSN (nginX time)
			//
			this.totReqNgi = [0,0,0,0];
			this.requests[0].sort(function(a, b) {return a.tsn - b.tsn});
			for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][2] = this.requests[0][Math.ceil(this.reqExecuted * this.histogram[i][0] / 100) - 1].tsn;
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
            this.tpNginx = Math.ceil(this.tpAngular * this.totAngular / this.totNginx);
			//
			// Sort by EXTS (nodeJS time)
			//
			this.requests[0].sort(function(a, b) {return a.exts - b.exts});
			for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][3] = this.requests[0][Math.ceil(this.reqExecuted * this.histogram[i][0] / 100) - 1].exts;
            }
			for (i = 0; i < this.requests[0].length; i++) {
				this.totNode += ((i>=this.discardLower)&&(i<=this.discardUpper))?this.requests[0][i].exts:0;
			}
            this.tpNode = Math.ceil(this.tpNginx * this.totNginx / this.totNode);
            //
            // Sort by RED (redis.io time)
            //
            this.requests[0].sort(function(a, b) {return a.red - b.red});
            for (i = 0; i < this.histogram.length; i++) {
                this.histogram[i][4] = this.requests[0][Math.ceil(this.reqExecuted * this.histogram[i][0] / 100) - 1].red;
            }
            for (i = 0; i < this.requests[0].length; i++) {
                this.totRedis += ((i >= this.discardLower) && (i <= this.discardUpper)) ? this.requests[0][i].red : 0;
            }
            this.tpRedis = Math.ceil(this.tpNode * this.totNode / this.totRedis);
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
                        var idx = ((selfRTT.hdrRTTresults.chart[n].percentile * selfRTT.reqOK / 100) | 0) - 1;
		                selfRTT.lineChartData[0].values.push({
			                                                     x: selfRTT.hdrRTTresults.chart[n].percentile,
			                                                     y: selfRTT.hdrRTTresults.chart[n].value
		                                                     });
		                selfRTT.lineChartData[1].values.push({
			                                                     x: selfRTT.hdrRTTresults.chart[n].percentile,
                                                                 y: selfRTT.requests[0][(idx < 0) ? 0 : idx].rtt
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
                    selfRTT.liveEvents = false;
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
        AppSimulator.prototype.getDurationRequests = function() {
            var tot = (this.reqDuration * 1000 * this.reqConn / this.reqInterval) | 0;
            return tot - (tot % this.reqConn);
        };
        AppSimulator.prototype.getDurationThroughput = function() {
            return (this.getDurationRequests() / this.reqDuration) | 0;
        };
		AppSimulator.prototype.checkStop = function() {
            this.duration = Date.now() - this.iniTime;
            if (this.reqOK + this.reqErrors >= this.reqCount) {
				this.calculating = true;
                this.reqExecuted = this.reqCount;
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
                            rid:  'Request ' + ((response[k].reqId | 0) + 1),
							hst:  self.nodeIdx[response[k].json.hostname][0],
							rtt:  response[k].rtt,
							tsn:  response[k].tsn,
                            exts: response[k].exts,
                            red:  response[k].red
						};
                        ++self.reqOK;
                        if (response[k].cached) {
                            self.reqCached++;
                            self.cachedResp.push(self.reqOK);
                        }
                        else {
                            if (!(response[k].json.pid in self.pidIdx[response[k].json.hostname])) {
                                self.results[self.nodeIdx[response[k].json.hostname][0]][1].push([response[k].json.pid,
                                                                                                  []]);
                                self.pidIdx[response[k].json.hostname][response[k].json.pid] = self.results[self.nodeIdx[response[k].json.hostname][0]][1].length - 1;
                            }
                            self.results[self.nodeIdx[response[k].json.hostname][0]][1][self.pidIdx[response[k].json.hostname][response[k].json.pid]][1].push(self.reqOK);
                            self.nodeIdx[response[k].json.hostname][1]++;
                        }
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
            self.countRequests = 0;
            self.countResponses = 0;
            self.timerRunning = true;
            var intervalFunction = function() {
                if (self.timerRunning && self.countRequests < self.reqCount) {
                    self.countRequests += self.reqConn;
                    var arrReq = [];
                    var operT = 0;
                    for (var j = 0; j < self.reqConn; j++) {
                        self.requests[0].push({rtt: 0, hst: '', rid: 0, tsn: 0, exts: 0, red: 0});
                        operT = self.operationProb[(Math.random() * 10) | 0];
                        self.operType[operT]++;
                        self.requests[1].push(self.httpService.get(reqId, self.selectedUrl, operT, (Math.random() * 16384) | 0));
                        self.requests[2].push(operT);
                        arrReq.push(self.requests[1][reqId]);
                        reqId++;
                    }
                    var observableRequestsA = Rx.Observable.forkJoin(arrReq).subscribe(
                        function(response) {
                            self.duration = Date.now() - self.iniTime;
                            if (self.countResponses < self.reqCount) {
                                for (var k = 0; k < response.length; k++) {
                                    self.requests[0][response[k].reqId] = {
                                        rid:  'Request ' + ((response[k].reqId | 0) + 1),
                                        hst:  self.nodeIdx[response[k].json.hostname][0],
                                        rtt:  response[k].rtt,
                                        tsn:  response[k].tsn,
                                        exts: response[k].exts,
                                        red:  response[k].red
                                    };
                                    ++self.reqOK;
                                    if (response[k].cached) {
                                        self.reqCached++;
                                        self.cachedResp.push(self.reqOK);
                                    }
                                    else {
                                        if (!(response[k].json.pid in self.pidIdx[response[k].json.hostname])) {
                                            self.results[self.nodeIdx[response[k].json.hostname][0]][1].push([response[k].json.pid,
                                                                                                              []]);
                                            self.pidIdx[response[k].json.hostname][response[k].json.pid] = self.results[self.nodeIdx[response[k].json.hostname][0]][1].length - 1;
                                        }
                                        self.results[self.nodeIdx[response[k].json.hostname][0]][1][self.pidIdx[response[k].json.hostname][response[k].json.pid]][1].push(self.reqOK);
                                        self.nodeIdx[response[k].json.hostname][1]++;
                                    }
                                    self.countResponses++;
                                }
                            }
                            else {
                                if (self.countResponses > self.reqCount) {
                                    for (var z = 0; z < self.reqConn; z++) {
                                        self.requests[0].pop();
                                        self.requests[1].pop();
                                        self.countResponses--;
                                    }
                                }
                            }
                        },
                        function(error) {
                            self.duration = Date.now() - self.iniTime;
                            if (self.countResponses < self.reqCount) {
                                self.reqErrors++;
                                self.countResponses++;
                            }
                            else {
                                if (self.countResponses > self.reqCount) {
                                    for (var z = 0; z < self.reqConn; z++) {
                                        self.requests[0].pop();
                                        self.requests[1].pop();
                                        self.countResponses--;
                                    }
                                }
                            }
                        },
                        function() {
                            if (!self.timerRunning && !self.calculating && self.countRequests === self.countResponses) {
                                if (self.intervalHandler) {
                                    clearInterval(self.intervalHandler);
                                }
                                self.calculating = true;
                                var selfStop = self;
                                self.reqExecuted = self.countResponses;
                                setTimeout(function() {
                                    selfStop.calculateHistogram();
                                }, 500);
                            }
                            observableRequestsA.unsubscribe();
                            observableRequestsA = undefined;
                        }
                    );
                }
                else {
                    if (!self.calculating && self.countRequests === self.countResponses) {
                        if (self.intervalHandler) {
                            clearInterval(self.intervalHandler);
                        }
                        self.calculating = true;
                        var selfStop = self;
                        self.reqExecuted = self.countResponses;
                        setTimeout(function() {
                            selfStop.calculateHistogram();
                        }, 500);
                    }
                }
            };
            self.iniTime = Date.now();
            setTimeout(function() {
                self.timerRunning = false;
            }, self.reqDuration * 1000 + 10);
            intervalFunction();
            self.intervalHandler = setInterval(intervalFunction, self.reqInterval);
        };
        AppSimulator.prototype.getDatabaseStatus = function(cond) {
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
        AppSimulator.prototype.showRef = function() {
            this.showReference = !this.showReference;
            if (this.showReference) {
                this.liveEvents = false;
            }
        };
        AppSimulator.prototype.showLive = function() {
            this.liveEvents = !this.liveEvents;
            if (this.liveEvents) {
                this.showReference = false;
            }
        };
        AppSimulator.prototype.mapDBmatrix = function(x, y) {
            return ((((x * 32) + y) * 16 / 2731) | 0);
        };
        AppSimulator.prototype.initEVMatrix = function() {
            this.evMatrix = [];
            for (var i = 0; i < 16; i++) {
                this.evMatrix.push([]);
                for (var j = 0; j < 32; j++) {
                    this.evMatrix[i].push(this.mapDBmatrix(i, j));
                }
            }
        };
		AppSimulator.prototype.initSimulator = function() {
            this.liveEvents = true;
            this.showReference = false;
            this.reqOK = 0;
            this.reqErrors = 0;
            this.reqCached = 0;
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
            this.cachedResp = [];
            this.operType = [0,
                             0,
                             0,
                             0];
            this.execMode = this.getSimulationMethod();
            this.execReq = this.reqCount;
            this.execDuration = this.reqDuration;
            this.execInterval = this.reqInterval;
            this.execConn = this.reqConn;
            this.execMaxReq = this.getDurationRequests();
            this.initEVMatrix();
            this.running = true;
            if (this.isDuration) {
                this.reqCount = this.getDurationRequests();
                this.throwHTTPduration();
            }
            else {
                var operT = 0;
                for (var reqId = 0; reqId < this.reqCount; reqId++) {
                    this.requests[0].push({rtt: 0, hst: '', rid: 0, tsn: 0, exts: 0, red: 0, cached: false});
                    operT = this.operationProb[(Math.random() * 10) | 0];
                    this.operType[operT]++;
                    this.requests[1].push(this.httpService.get(reqId, this.selectedUrl, operT, (Math.random() * 16384) | 0));
                    this.requests[2].push(operT);
                }
                this.iniTime = Date.now();
                this.throwHTTPrequests(this.loopCon);
            }
		};
		return AppSimulator;
	})();
})(window.app || (window.app = {}));
