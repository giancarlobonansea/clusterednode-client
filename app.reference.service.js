"use strict";
(function(app) {
	app.ReferenceService = (function() {
		var ReferenceService = function(DOMSanitizer) {
			var iRL = function(rl,ds) {
				var l = {
					l0: rl.l0,
					l1: rl.l1,
					v: []
				};
				for (var i = 0; i < rl.v.length; i++) {
					l.v.push({
						         t: rl.v[i].t,
						         a: []
					         });
					for (var j = 0; j < rl.v[i].a.length; j++) {
						l.v[i].a.push({
							              h: ds.bypassSecurityTrustResourceUrl(rl.v[i].a[j].h),
							              d: rl.v[i].a[j].d
						              });
					}
				}
				return l;
			};
			this.rVEV();
			this.links = iRL({
				                 "l0": [
					                 {
						                 t: "HTTP/2",
						                 a: [
							                 {
								                 h: "https://http2.akamai.com/demo",
								                 d: "HTTP/2: the Future of the Internet | Akamai"
							                 },
							                 {
								                 h: "https://http2.github.io",
								                 d: "HTTP/2 Github repository"
							                 },
							                 {
								                 h: "https://http2.github.io/http2-spec/",
								                 d: "Hypertext Transfer Protocol Version 2 (HTTP/2) draft-ietf-httpbis-http2-latest"
							                 },
							                 {
								                 h: "https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/present?slide=id.g4ec7b01d4_5_150",
								                 d: "HTTP/2 is here, let's optimize! - Velocity 2015 - Google Slides"
							                 },
							                 {
								                 h: "http://caniuse.com/#search=HTTP%2F2",
								                 d: "Can I use... HTTP/2"
							                 },
							                 {
								                 h: "https://hpbn.co/http2/",
								                 d: "HTTP: HTTP/2 - High Performance Browser Networking (O'Reilly)"
							                 },
							                 {
								                 h: "https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/",
								                 d: "Getting Ready For HTTP/2: A Guide For Web Designers And Developers"
							                 },
							                 {
								                 h: "http://qnimate.com/post-series/http2-complete-tutorial/",
								                 d: "HTTP/2 Complete Tutorial"
							                 },
							                 {
								                 h: "http://javascriptplayground.com/blog/2016/03/http2-and-you/",
								                 d: "HTTP/2 and You"
							                 },
							                 {
								                 h: "https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin",
								                 d: "HTTP/2 and SPDY indicator"
							                 },
							                 {
								                 h: "http://www.aosabook.org/en/posa/secrets-of-mobile-network-performance.html",
								                 d: "Secrets of Mobile Network Performance"
							                 },
							                 {
								                 h: "http://blog.httpwatch.com/2015/01/16/a-simple-performance-comparison-of-https-spdy-and-http2/comment-page-1/",
								                 d: "A Simple Performance Comparison of HTTPS, SPDY and HTTP/2"
							                 },
							                 {
								                 h: "https://blog.cloudflare.com/tools-for-debugging-testing-and-using-http-2/",
								                 d: "Tools for debugging, testing and using HTTP/2"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Google QUIC",
						                 a: [
							                 {
								                 h: "https://en.wikipedia.org/wiki/QUIC",
								                 d: "QUIC (Quick UDP Internet Connections)"
							                 },
							                 {
								                 h: "https://docs.google.com/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34/edit",
								                 d: "QUIC: Design Document and Specification Rationale"
							                 },
							                 {
								                 h: "https://docs.google.com/document/d/1lmL9EF6qKrk7gbazY8bIdvq3Pno2Xj_l_YShP40GLQE/edit",
								                 d: "QUIC FAQ for Geeks"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=hQZ-0mXFmk8",
								                 d: "QUIC: next generation multiplexed transport over UDP"
							                 },
							                 {
								                 h: "http://c3lab.poliba.it/images/3/3b/QUIC_SAC15.pdf",
								                 d: "HTTP over UDP: an Experimental Investigation of QUIC"
							                 },
							                 {
								                 h: "https://www.chromium.org/quic",
								                 d: "QUIC, a multiplexed stream transport over UDP"
							                 },
							                 {
								                 h: "http://blog.chromium.org/2015/04/a-quic-update-on-googles-experimental.html",
								                 d: "A QUIC update on Google’s experimental transport"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Advanced Networking",
						                 a: [
							                 {
								                 h: "http://linuxgazette.net/135/pfeiffer.html",
								                 d: "TCP and Linux' Pluggable Congestion Control Algorithms"
							                 },
							                 {
								                 h: "http://sgros.blogspot.com.br/2012/12/controlling-which-congestion-control.html",
								                 d: "Controlling which congestion control algorithm is used in Linux"
							                 },
							                 {
								                 h: "https://en.wikipedia.org/wiki/TCP_congestion_control",
								                 d: "TCP congestion control"
							                 },
							                 {
								                 h: "http://elinux.org/Raspberry_Pi_Kernel_Compilation#Build_modules_for_the_running_kernel",
								                 d: "Build modules for the running Linux kernel"
							                 },
							                 {
								                 h: "https://fasterdata.es.net/host-tuning/linux/",
								                 d: "Linux Tunning - TCP tunning"
							                 },
							                 {
								                 h: "http://shokunin.co/blog/2014/11/11/operational_redis.html",
								                 d: "Running Redis in production - network and CPU balancing"
							                 },
							                 {
								                 h: "https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/network-rps.html",
								                 d: "RPS - Receive Packet Steering for network performance"
							                 },
							                 {
								                 h: "http://www.linuxbrigade.com/reduce-time_wait-socket-connections/",
								                 d: "Reduce TIME_WAIT socket connections"
							                 },
							                 {
								                 h: "https://vincent.bernat.im/en/blog/2014-tcp-time-wait-state-linux.html",
								                 d: "Coping with the TCP TIME-WAIT state on busy Linux servers"
							                 },
							                 {
								                 h: "https://easyengine.io/tutorials/linux/sysctl-conf/",
								                 d: "Performance - Sysctl Tweaks"
							                 },
							                 {
								                 h: "https://tweaked.io/guide/kernel/",
								                 d: "Tweaked.io making your servers fly"
							                 },
							                 {
								                 h: "https://lwn.net/Articles/616241/",
								                 d: "A damp discussion of network queuing - fq_codel"
							                 },
							                 {
								                 h: "https://www.bufferbloat.net/projects/codel/wiki/",
								                 d: "CoDel Overview"
							                 },
							                 {
								                 h: "https://wiki.mikejung.biz/Sysctl_tweaks",
								                 d: "Sysctl tweaks"
							                 },
							                 {
								                 h: "https://en.wikipedia.org/wiki/Bufferbloat",
								                 d: "Bufferbloat - the problem"
							                 },
							                 {
								                 h: "http://www.satnac.org.za/proceedings/2012/papers/2.Core_Network_Technologies/15.pdf",
								                 d: "TCP Congestion Control Comparison (University of Stellenbosch)"
							                 },
							                 {
								                 h: "http://research.microsoft.com/en-us/um/redmond/events/tcpsummit/Slides/ms_feb07_eval.ppt.pdf",
								                 d: "Evaluating New TCP Congestion Control Algorithms"
							                 },
							                 {
								                 h: "https://tools.ietf.org/html/rfc6937",
								                 d: "IETF RFC6937 - Proportional Rate Reduction for TCP"
							                 },
							                 {
								                 h: "https://blog.cloudflare.com/optimizing-the-linux-stack-for-mobile-web-per/",
								                 d: "Optimizing Your Linux Stack for Maximum Mobile Web Performance"
							                 },
							                 {
								                 h: "http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37486.pdf",
								                 d: "Google's Proportional Rate Reduction for TCP"
							                 },
							                 {
								                 h: "http://airccse.org/journal/nsa/0912nsa02.pdf",
								                 d: "Comparison of high speed congestion control protocols"
							                 },
							                 {
								                 h: "http://193.204.59.68/mascolo/tcp%20westwood/Tech_Rep_07_03_S.pdf",
								                 d: "Performance Comparison of Reno, Vegas and Westwood+ TCP Congestion Control"
							                 },
							                 {
								                 h: "http://www.linux-magazine.com/Issues/2015/175/FQ-CoDel-and-MPTCP",
								                 d: "Speeding up mobile networks with FQ CoDel and MPTCP"
							                 },
							                 {
								                 h: "https://blog.cloudflare.com/how-to-receive-a-million-packets/",
								                 d: "How to receive a million packets per second"
							                 },
							                 {
								                 h: "https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html-single/Performance_Tuning_Guide/",
								                 d: "Linux - Performance Tuning Guide"
							                 },
							                 {
								                 h: "http://www.cubrid.org/blog/dev-platform/understanding-tcp-ip-network-stack/",
								                 d: "Understanding TCP/IP Network Stack & Writing Network Apps"
							                 },
							                 {
								                 h: "http://datacratic.com/site/blog/1m-qps-nginx-and-ubuntu-1204-ec2",
								                 d: "1M QPS WITH NGINX"
							                 },
							                 {
								                 h: "https://greenhost.net/2013/04/10/multi-queue-network-interfaces-with-smp-on-linux/",
								                 d: "Multi-queue network interfaces with SMP on Linux"
							                 },
							                 {
								                 h: "https://blog.cloudflare.com/single-rx-queue-kernel-bypass-with-netmap/",
								                 d: "Single RX queue kernel bypass in Netmap for high packet rate networking"
							                 },
							                 {
								                 h: "http://balodeamit.blogspot.com.br/2013/10/receive-side-scaling-and-receive-packet.html",
								                 d: "Receive Side Scaling and Receive Packet Steering"
							                 },
							                 {
								                 h: "http://blog.packagecloud.io/eng/2016/06/22/monitoring-tuning-linux-networking-stack-receiving-data/",
								                 d: "Monitoring and Tuning the Linux Networking Stack: Receiving Data"
							                 },
							                 {
								                 h: "http://rhelblog.redhat.com/2015/09/29/pushing-the-limits-of-kernel-networking/",
								                 d: "Pushing the Limits of Kernel Networking"
							                 },
							                 {
								                 h: "http://www.kegel.com/c10k.html",
								                 d: "The C10K problem"
							                 }
						                 ]
					                 },
					                 {
						                 t: "IPSEC/L2TP secure tunneling",
						                 a: [
							                 {
								                 h: "http://scruss.com/blog/2013/06/07/well-that-was-unexpected-the-raspberry-pis-hardware-random-number-generator/",
								                 d: "hwrng - Hardware random number generator"
							                 },
							                 {
								                 h: "https://www.openswan.org",
								                 d: "Openswan - IPsec implementation for Linux - support for IKEv2, X.509 Digital Certificates, NAT Traversal"
							                 },
							                 {
								                 h: "http://linux.tips/tutorials/how-to-setup-l2tp-vpn-server-on-raspberry-pi",
								                 d: "How to setup L2TP VPN server on Raspberry Pi"
							                 },
							                 {
								                 h: "https://github.com/Unitech/tty.js",
								                 d: "tty.js - a terminal in your browser using node.js and socket.io"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Linux Virtual Server",
						                 a: [
							                 {
								                 h: "http://www.linuxvirtualserver.org",
								                 d: "LVS - Linux Virtual Server"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/software/ipvs.html",
								                 d: "IPVS (IP Virtual Server)"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/Documents.html",
								                 d: "LVS Documentation"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/docs/sync.html",
								                 d: "IPVS Connection Synchronization"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/docs/arp.html",
								                 d: "ARP problem in VS/TUN and VS/DR"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/HighAvailability.html",
								                 d: "LVS - High Availability"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/VS-DRouting.html",
								                 d: "Virtual Server via Direct Routing"
							                 },
							                 {
								                 h: "http://kb.linuxvirtualserver.org/wiki/LVS_Cluster_Management",
								                 d: "LVS Cluster Management"
							                 },
							                 {
								                 h: "http://www.linuxvirtualserver.org/architecture.html",
								                 d: "General Architecture of LVS Clusters"
							                 },
							                 {
								                 h: "http://kb.linuxvirtualserver.org/wiki/Performance_and_Tuning",
								                 d: "LVS - Performance and Tuning"
							                 },
							                 {
								                 h: "http://kb.linuxvirtualserver.org/wiki/Ipvsadm",
								                 d: "ipvsadm - IP VS Admin"
							                 }
						                 ]
					                 },
					                 {
						                 t: "HDR Histograms w/o Coordinated Omission (v2.1.9)",
						                 a: [
							                 {
								                 h: "http://bravenewgeek.com/everything-you-know-about-latency-is-wrong/",
								                 d: "Everything You Know About Latency Is Wrong"
							                 },
							                 {
								                 h: "http://hdrhistogram.org/",
								                 d: "HdrHistogram: A High Dynamic Range Histogram"
							                 },
							                 {
								                 h: "https://github.com/giltene/wrk2",
								                 d: "wrk2 - a HTTP benchmarking tool based mostly on wrk"
							                 },
							                 {
								                 h: "https://www.npmjs.com/package/native-hdr-histogram",
								                 d: "node.js bindings for hdr histogram C implementation"
							                 },
							                 {
								                 h: "http://psy-lob-saw.blogspot.com.br/2015/02/hdrhistogram-better-latency-capture.html",
								                 d: "HdrHistogram: A better latency capture method"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=6Rs0p3mPNr0",
								                 d: "How NOT to measure latency - Gil Tene"
							                 },
							                 {
								                 h: "https://nirajrules.wordpress.com/2009/09/17/measuring-performance-response-vs-latency-vs-throughput-vs-load-vs-scalability-vs-stress-vs-robustness/",
								                 d: "Performance Testing – Response vs. Latency vs. Throughput vs. Load vs. Scalability vs. Stress vs. Robustness"
							                 }
						                 ]
					                 },
					                 {
						                 t: "OpenSSL (v1.1.0)",
						                 a: [
							                 {
								                 h: "https://www.openssl.org/",
								                 d: "OpenSSL - Cryptography and SSL/TLS Toolkit"
							                 }
						                 ]
					                 },
					                 {
						                 t: "stunnel (v5.35)",
						                 a: [
							                 {
								                 h: "https://www.stunnel.org/index.html",
								                 d: "Stunnel - a proxy designed to add TLS encryption functionality to existing clients and servers"
							                 },
							                 {
								                 h: "http://bencane.com/2014/02/18/sending-redis-traffic-through-an-ssl-tunnel-with-stunnel/",
								                 d: "Sending redis traffic through an SSL tunnel with stunnel"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Socket.IO (v1.4.8)",
						                 a: [
							                 {
								                 h: "http://socket.io/blog/",
								                 d: "Socket.IO - The fastest and most reliable real-time engine"
							                 },
							                 {
								                 h: "http://stackoverflow.com/questions/19496790/drop-packets-if-falling-behind-with-socket-io-in-node-js",
								                 d: "How to handle dropping packets on volatile messages"
							                 },
							                 {
								                 h: "http://blog.mixu.net/2011/11/22/performance-benchmarking-socket-io-0-8-7-0-7-11-and-0-6-17-and-nodes-native-tcp/",
								                 d: "Performance benchmarking Socket.io 0.8.7, 0.7.11 and 0.6.17 and Node's native TCP"
							                 },
							                 {
								                 h: "https://devcentral.f5.com/articles/html5-web-sockets-changes-the-scalability-game",
								                 d: "HTML5 Web Sockets Changes the Scalability Game"
							                 }
						                 ]
					                 },
					                 {
						                 "t": "Lightweight API bus",
						                 "a": [
							                 {
								                 h: "https://www.nginx.com/blog/introducing-the-nginx-microservices-reference-architecture/",
								                 d: "Introducing the Microservices Reference Architecture from NGINX"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/building-microservices-using-an-api-gateway/",
								                 d: "Building Microservices: Using an API Gateway"
							                 },
							                 {
								                 h: "https://strongloop.com/",
								                 d: "IBM Strongloop - Compose APIs, Build, Deploy and Monitor Node"
							                 },
							                 {
								                 "h": "https://strongloop.com/strongblog/creating-rest-apis-from-data-models-in-api-connect/?utm_source=StrongLoop+Newsletter&utm_campaign=914572788f-June_2015_Newsletter4_6_2015&utm_medium=email&utm_term=0_5cdaff72d5-914572788f-281500181",
								                 "d": "Creating REST APIs from Data Models in API Connect"
							                 },
							                 {
								                 "h": "https://developer.ibm.com/apiconnect/",
								                 "d": "IBM API Connect"
							                 },
							                 {
								                 "h": "https://developer.ibm.com/apiconnect/2016/06/02/introducing-the-api-connect-getting-started-video-series/?utm_source=StrongLoop+Newsletter&utm_campaign=914572788f-June_2015_Newsletter4_6_2015&utm_medium=email&utm_term=0_5cdaff72d5-914572788f-281500181",
								                 "d": "IBM API Connect training videos"
							                 },
							                 {
								                 "h": "http://loopback.io",
								                 "d": "Loopback - The Node.js API Framework"
							                 },
							                 {
								                 "h": "http://hapijs.com",
								                 "d": "hapijs - A rich framework for building applications and services"
							                 },
							                 {
								                 "h": "http://sailsjs.org",
								                 "d": "sails - The web framework of your dreams"
							                 },
							                 {
								                 "h": "http://expressjs.org",
								                 "d": "ExpressJs"
							                 },
							                 {
								                 "h": "http://koajs.com",
								                 "d": "koa - next generation framework for node.js"
							                 },
							                 {
								                 "h": "http://restify.com",
								                 "d": "restify - node.js module built specifically to enable you to build correct REST web services"
							                 },
							                 {
								                 "h": "http://flatironjs.org",
								                 "d": "FlatIron "
							                 },
							                 {
								                 "h": "http://www.actionherojs.com",
								                 "d": "ActionHero - The Reusable, Scalable, and Quick node.js API Server!"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=jm75pxsb80c",
								                 d: "Microservice Developer Experience"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=SYNJFX0oIBU",
								                 d: "Node.js for Enterprise APIs Panel Discussion"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=D9TUU5bK0iE",
								                 d: "Rebuilding the Ship as it Sails: Making Large Legacy Sites Responsive"
							                 }
						                 ]
					                 }
				                 ],
				                 "l1": [
					                 {
						                 t: "Javascript, V8 & AngularJS 2 (v2.0.0)",
						                 a: [
							                 {
								                 h: "https://angular.io",
								                 d: "One framework - Angular 2"
							                 },
							                 {
								                 h: "https://angular.io/docs/js/latest/guide/cheatsheet.html",
								                 d: "Angular Cheat Sheet - js"
							                 },
							                 {
								                 "h": "https://universal.angular.io/",
								                 "d": "Angular Universal - Server-side Rendering for Angular 2 apps"
							                 },
							                 {
								                 "h": "https://cli.angular.io/",
								                 "d": "Angular CLI - A command line interface for Angular"
							                 },
							                 {
								                 "h": "https://material.angularjs.org/latest/",
								                 "d": "Angular Material - UI Component framework and a reference implementation of Google's Material Design Specification"
							                 },
							                 {
								                 h: "https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.ttmhbubnd",
								                 d: "Angular 2 — Introduction to new HTTP module"
							                 },
							                 {
								                 h: "https://coryrylan.com/blog/angular-2-observable-data-services",
								                 d: "Angular 2 Observable Data Services"
							                 },
							                 {
								                 h: "http://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html",
								                 d: "Taking advantage of Observables in Angular 2"
							                 },
							                 {
								                 h: "https://youtu.be/PkOBnYxqj3k",
								                 d: "Critical rendering path - Crash course on web performance"
							                 },
							                 {
								                 h: "https://youtu.be/N1swY14jiKc",
								                 d: "V8, modern JavaScript, and beyond - Google I/O 2016"
							                 },
							                 {
								                 h: "https://youtu.be/etACK2qbHfc",
								                 d: "There is a client-side proxy (ServiceWorker) in your browser!"
							                 },
							                 {
								                 h: "https://youtu.be/EwYD_xqB7Qs",
								                 d: "Angular 2 - Google I/O 2016"
							                 },
							                 {
								                 h: "https://youtu.be/7gtf47D_bu0",
								                 d: "Bandwidth, latency, and radio performance - Crash course on web performance"
							                 },
							                 {
								                 h: "https://youtu.be/46exugLbGFI",
								                 d: "Optimizing networking performance (and HTTP 2.0) - Crash course on web performance "
							                 },
							                 {
								                 h: "https://youtu.be/7ubJzEi3HuA",
								                 d: "Speed, Performance, and Human Perception"
							                 },
							                 {
								                 h: "https://youtu.be/rpNXWxMyzHQ",
								                 d: "Delivering 60 FPS in the browser - Crash course on web performance"
							                 },
							                 {
								                 h: "https://developers.google.com/v8/experiments",
								                 d: "Experiments with Strengthening JavaScript - Strong mode"
							                 },
							                 {
								                 h: "http://v8project.blogspot.com.br/2016/07/v8-at-blinkon-6-conference.html",
								                 d: "Real-world JavaScript Performance"
							                 },
							                 {
								                 h: "https://docs.google.com/document/d/1hOaE7vbwdLLXWj3C8hTnnkpE0qSa2P--dtDvwXXEeD0/pub",
								                 d: "Crankshafting from the ground up"
							                 },
							                 {
								                 h: "http://wingolog.org/archives/2011/08/02/a-closer-look-at-crankshaft-v8s-optimizing-compiler",
								                 d: "A closer look at crankshaft, V8's optimizing compiler"
							                 },
							                 {
								                 h: "http://wingolog.org/archives/2011/07/05/v8-a-tale-of-two-compilers",
								                 d: "V8: a tale of two compilers"
							                 },
							                 {
								                 h: "http://wingolog.org/archives/2011/06/10/v8-is-faster-than-gcc",
								                 d: "V8 is faster than GCC"
							                 },
							                 {
								                 h: "http://wingolog.org/archives/2011/06/20/on-stack-replacement-in-v8",
								                 d: "On-stack replacement in v8"
							                 },
							                 {
								                 h: "http://wingolog.org/archives/2011/06/08/what-does-v8-do-with-that-loop",
								                 d: "What does V8 do with that loop?"
							                 },
							                 {
								                 h: "https://developers.google.com/v8/design",
								                 d: "V8 Architectural Design Elements"
							                 },
							                 {
								                 h: "http://blog.chromium.org/2015/07/revving-up-javascript-performance-with.html",
								                 d: "Revving up JavaScript performance with TurboFan"
							                 },
							                 {
								                 h: "http://blog.chromium.org/2015/03/new-javascript-techniques-for-rapid.html",
								                 d: "New JavaScript techniques for rapid page loads"
							                 },
							                 {
								                 h: "https://docs.google.com/document/d/1Qk0qC4s_XNCLemj42FqfsRLp49nDQMZ1y7fwf5YjaI4/view",
								                 d: "A Strong Mode for JavaScript (Strawman proposal)"
							                 },
							                 {
								                 h: "https://drive.google.com/file/d/0B1v38H64XQBNT1p2XzFGWWhCR1k/view",
								                 d: "Experimental New Directions for JavaScript"
							                 },
							                 {
								                 h: "https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/",
								                 d: "Eliminating Roundtrips with Preconnect"
							                 },
							                 {
								                 h: "https://www.webpagetest.org",
								                 d: "Detailed Performance Test for websites - cloud based"
							                 },
							                 {
								                 h: "https://hpbn.co/primer-on-web-performance/",
								                 d: "High Performance Browser Networking - Primer on Web Performance"
							                 },
							                 {
								                 h: "https://www.keycdn.com/blog/resource-hints/",
								                 d: "Resource Hints – What is Preload, Prefetch, and Preconnect?"
							                 },
							                 {
								                 h: "https://www.w3.org/TR/resource-hints/",
								                 d: "Resource Hints - W3C Working Draft 27 May 2016"
							                 }
						                 ]
					                 },
					                 {
						                 t: "ng2-nvd3 Charting Library (v1.1.3)",
						                 a: [
							                 {
								                 h: "https://github.com/krispo/ng2-nvd3",
								                 d: "Angular2 component for nvd3"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Google Analytics",
						                 a: [
							                 {
								                 h: "https://analytics.google.com/",
								                 d: "Google Analytics"
							                 },
							                 {
								                 h: "http://blog.caelum.com.br/angularjs-seo-google-analytics-e-virtual-pages/",
								                 d: "AngularJS: SEO, Google Analytics e Virtual Pages"
							                 }
						                 ]
					                 },
					                 {
						                 t: "nginX (v1.11.4)",
						                 a: [
							                 {
								                 h: "https://www.nginx.com/blog/7-tips-for-faster-http2-performance/",
								                 d: "7 Tips for Faster HTTP/2 Performance"
							                 },
							                 {
								                 h: "https://www.maxcdn.com/blog/nginx-application-performance-optimization/",
								                 d: "6-Part Guide to NGINX Application Performance Optimization"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/10-tips-for-10x-application-performance/",
								                 d: "10 Tips for 10x Application Performance"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/socket-sharding-nginx-release-1-9-1/",
								                 d: "Socket Sharding in NGINX"
							                 },
							                 {
								                 h: "https://www.quora.com/How-can-nginx-handle-concurrent-requests-with-a-single-worker-process",
								                 d: "How can nginx handle concurrent requests with a single worker process?"
							                 },
							                 {
								                 h: "https://www.nginx.com/resources/admin-guide/load-balancer/",
								                 d: "NGINX Load Balancing - HTTP and TCP Load Balancer"
							                 },
							                 {
								                 h: "https://serversforhackers.com/so-you-got-yourself-a-loadbalancer",
								                 d: "So You Got Yourself a Loadbalancer"
							                 },
							                 {
								                 h: "http://www.aosabook.org/en/nginx.html",
								                 d: "The Architecture of Open Source Applications (Volume 2): nginx"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/",
								                 d: "Inside NGINX: How We Designed for Performance & Scale"
							                 },
							                 {
								                 h: "http://www.slideshare.net/joshzhu/nginx-internals",
								                 d: "nginX Internals - slide presentation"
							                 },
							                 {
								                 h: "http://www.thegeekstuff.com/2013/11/nginx-vs-apache/?utm_source=tuicool",
								                 d: "Nginx Vs Apache: Nginx Basic Architecture and Scalability"
							                 },
							                 {
								                 h: "https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations",
								                 d: "Apache vs Nginx: Practical Considerations"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/nginx-load-balance-deployment-models/",
								                 d: "NGINX Load Balancing Deployment Scenarios"
							                 },
							                 {
								                 h: "https://www.nginx.com/blog/globo-com-delivers-live-video-streaming-to-500000-viewers-with-nginx/",
								                 d: "Globo.com Delivers Live Video Streaming to 500,000+ Viewers with NGINX"
							                 },
							                 {
								                 h: "http://tecadmin.net/ip-failover-setup-using-keepalived-on-centos-redhat-6/#",
								                 d: "IP FailOver Setup Using KeepAlived "
							                 },
							                 {
								                 h: "https://leandromoreira.com.br/2015/10/12/how-to-optimize-nginx-configuration-for-http2-tls-ssl/",
								                 d: "How To Optimize Nginx Configuration for HTTP/2 TLS (SSL)"
							                 },
							                 {
								                 h: "http://jvdc.me/fine-tune-gzip-compressing-and-enable-static-file-caching-on-nginx/",
								                 d: "Fine-tune GZIP compressing and enable static file caching on NGINX"
							                 },
							                 {
								                 h: "http://killtheradio.net/technology/using-gzip_static-in-nginx-to-cache-gzip-files/",
								                 d: "Using gzip_static in nginx to cache gzip files"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Node.js (v6.6.0)",
						                 a: [
							                 {
								                 h: "https://nodejs.org/en/",
								                 d: "Node.js - a JavaScript runtime built on Chrome's V8 JavaScript engine"
							                 },
							                 {
								                 h: "http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/",
								                 d: "Beginner’s Guide to Installing Node.js on a Raspberry Pi"
							                 },
							                 {
								                 h: "http://blog.keithcirkel.co.uk/load-balancing-node-js/",
								                 d: "Load balancing Node.js"
							                 },
							                 {
								                 h: "https://www.npmjs.com/package/http2",
								                 d: "An HTTP/2 client and server implementation"
							                 },
							                 {
								                 h: "http://nodeschool.io/",
								                 d: "NodeSchool.io - Node.js concepts via interactive command-line games"
							                 },
							                 {
								                 h: "https://nodejs.org/static/documents/casestudies/Nodejs-at-Uber.pdf",
								                 d: "How Uber Uses Node.js to Scale Their Business"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=p74282nDMX8",
								                 d: "Node.js at Netflix"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=ElI5QtUISWM",
								                 d: "Node.js at Uber"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=-00ImeLt9ec",
								                 d: "Node.js at PayPal"
							                 },
							                 {
								                 h: "https://www.youtube.com/watch?v=BJPeLJhv1Ic",
								                 d: "Node.js at CapitalOne"
							                 },
							                 {
								                 h: "http://blog.trevnorris.com/2013/07/measuring-node-performance-part-1.html",
								                 d: "Measuring node performance"
							                 },
							                 {
								                 h: "https://eng.uber.com/intro-to-ringpop/",
								                 d: "How ringpop from Uber Engineering helps distribute your application"
							                 },
							                 {
								                 h: "https://ringpop.readthedocs.io/en/latest/index.html",
								                 d: "Ringpop - a library that maintains a consistent hash ring atop a membership protocol"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Keymetrics pm2 (v2.0.12)",
						                 a: [
							                 {
								                 h: "http://pm2.keymetrics.io/",
								                 d: "PM2 - Advanced Node.js process manager"
							                 },
							                 {
								                 h: "http://pm2.keymetrics.io/docs/usage/cluster-mode/",
								                 d: "PM2 - Cluster Mode"
							                 },
							                 {
								                 h: "https://keymetrics.io/",
								                 d: "Keymetrics I/O - Monitor and Augment Node.js"
							                 },
							                 {
								                 h: "http://pm2.keymetrics.io/docs/usage/application-declaration/",
								                 d: "PM2 - Application Declaration"
							                 },
							                 {
								                 h: "http://pm2.keymetrics.io/docs/usage/deployment/",
								                 d: "PM2 - Deployment"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-auto-pull",
								                 d: "pm2-auto-pull: Synchronize all applications managed by PM2 + GIT automatically"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-server-monit",
								                 d: "pm2-server-monit: Monitor server CPU / Memory / Process / Zombie Process / Disk size / Security Packages / Network Input / Network Output"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-logrotate",
								                 d: "pm2-logrotate: Automatically log rotate all applications logs managed by PM2"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-nginx",
								                 d: "pm2-nginx: Monitor key nginX server metrics"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-mongodb",
								                 d: "pm2-mongodb: Monitor vital signs of your mongodb"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-redis",
								                 d: "pm2-redis: Module to monitor redis"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-couchdb",
								                 d: "pm2-couchdb: Monitor key CouchDB server metrics"
							                 },
							                 {
								                 h: "https://github.com/pm2-hive/pm2-webshell",
								                 d: "Expose a fully capable terminal in your browser"
							                 }
						                 ]
					                 },
					                 {
						                 t: "redis.io (v3.2.3)",
						                 a: [
							                 {
								                 h: "http://redis.io/",
								                 d: "redis.io - open source in-memory data structure store (database, cache and message broker)"
							                 },
							                 {
								                 h: "http://redis.js.org/",
								                 d: "REDIS - A Node.js redis client"
							                 },
							                 {
								                 h: "http://redis.io/topics/rediscli",
								                 d: "redis-cli, the Redis command line interface"
							                 },
							                 {
								                 h: "http://bluebirdjs.com/docs/getting-started.html",
								                 d: "Bluebird - full featured promise library with unmatched performance"
							                 },
							                 {
								                 h: "http://redis.io/topics/latency",
								                 d: "Redis latency problems troubleshooting"
							                 },
							                 {
								                 h: "http://redis.io/topics/latency-monitor",
								                 d: "Redis latency monitoring framework"
							                 },
							                 {
								                 h: "https://www.datadoghq.com/blog/how-to-collect-redis-metrics/",
								                 d: "How to collect Redis metrics"
							                 },
							                 {
								                 h: "https://www.datadoghq.com/wp-content/uploads/2013/09/Understanding-the-Top-5-Redis-Performance-Metrics.pdf",
								                 d: "Understanding the Top 5 Redis Performance Metrics"
							                 },
							                 {
								                 h: "http://www.iamtherealbill.com/2014/12/redis-performance-thoughts-2/",
								                 d: "More Thoughts on Redis Performance"
							                 },
							                 {
								                 h: "http://redis.io/topics/cluster-tutorial",
								                 d: "Redis cluster tutorial"
							                 },
							                 {
								                 h: "http://redis.io/topics/cluster-spec",
								                 d: "Redis Cluster Specification"
							                 },
							                 {
								                 h: "http://redis.io/commands",
								                 d: "Redis Command Sheet"
							                 },
							                 {
								                 h: "http://redis.io/presentation/Redis_Cluster.pdf",
								                 d: "Redis Cluster - a pragmatic approach to distribution"
							                 },
							                 {
								                 h: "https://github.com/luin/ioredis",
								                 d: "A robust, performance-focused and full-featured Redis client for Node"
							                 },
							                 {
								                 h: "https://github.com/luin/ioredis/wiki/Improve-Performance",
								                 d: "ioredis - Improve Performance"
							                 },
							                 {
								                 h: "https://github.com/thunks/thunk-redis",
								                 d: "The fastest thunk/promise-based redis client, support all redis features"
							                 },
							                 {
								                 h: "https://github.com/twitter/twemproxy",
								                 d: "A fast, light-weight proxy for memcached and redis"
							                 },
							                 {
								                 h: "http://engineering.bloomreach.com/the-evolution-of-fault-tolerant-redis-cluster/",
								                 d: "The Evolution of Fault Tolerant Redis Cluster"
							                 },
							                 {
								                 h: "http://www.iamtherealbill.com/2015/04/clusterizing-redis-intro/",
								                 d: "A Primer on Clusterizing Redis"
							                 },
							                 {
								                 h: "http://redis.io/topics/distlock",
								                 d: "Distributed locks with Redis"
							                 },
							                 {
								                 h: "http://redis.io/topics/notifications",
								                 d: "Redis Keyspace Notifications"
							                 },
							                 {
								                 h: "https://www.infoq.com/presentations/Real-Time-Delivery-Twitter",
								                 d: "redis use-cases: Real-Time Delivery Architecture at Twitter"
							                 },
							                 {
								                 h: "http://code.flickr.net/2011/10/11/talk-real-time-updates-on-the-cheap-for-fun-and-profit/",
								                 d: "redis use-cases: Flickr - Real-time Updates on the Cheap for Fun and Profit"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Open Source architectures",
						                 a: [
							                 {
								                 h: "http://www.aosabook.org/en/index.html",
								                 d: "The Architecture of Open Source Applications"
							                 },
							                 {
								                 h: "https://www.mnot.net/cache_docs/",
								                 d: "Caching tutorial for Web Authors"
							                 },
							                 {
								                 h: "http://uber.github.io/",
								                 d: "Open Source at Uber"
							                 }
						                 ]
					                 },
					                 {
						                 t: "GitHub",
						                 a: [
							                 {
								                 h: "https://github.com/giancarlobonansea/clusterednode-client",
								                 d: "NLB HA Clustered Node PoC - Client app"
							                 },
							                 {
								                 h: "https://github.com/giancarlobonansea/clusterednode-worker",
								                 d: "NLB HA Clustered Node PoC - Worker process"
							                 },
							                 {
								                 h: "https://github.com/giancarlobonansea/clusterednode-hdrhist",
								                 d: "NLB HA Clustered Node PoC - HDR Histogram service"
							                 },
							                 {
								                 h: "https://github.com/giancarlobonansea/clusterednode-pubsub",
								                 d: "NLB HA Clustered Node PoC - Pub/Sub Redis service"
							                 },
							                 {
								                 h: "https://github.com/giancarlobonansea/clusterednode-config",
								                 d: "NLB HA Clustered Node PoC - Configuration files"
							                 }
						                 ]
					                 }
				                 ],
				                 "v":  [
					                 {
						                 t: "HTTP/2",
						                 a: [
							                 {
								                 h: "https://www.youtube.com/embed/4vnLUc58NEA",
								                 d: "Akamai's Stephen Ludin on Internet evolution"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/r5oT_2ndjms",
								                 d: "HTTP/2 101 (Chrome Dev Summit 2015)"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/yURLTwZ3ehk",
								                 d: "Yesterday's perf best-practices are today's HTTP/2 anti-patterns"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/46exugLbGFI",
								                 d: "Optimizing networking performance (and HTTP 2.0) - Crash course on web performance"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/wR3o6HA47Ao",
								                 d: "unRESTful Web Services with HTTP2 by Fabian Stäber"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/MARxcGRRTk4",
								                 d: "Concur shares experience using H2"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Advanced Networking",
						                 a: [
							                 {
								                 h: "https://www.youtube.com/embed/nLrBisNqEwQ",
								                 d: "Computer Networks: History of TCP Congestion Control"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/quAaZKBHvs8",
								                 d: "Beating Bufferbloat with FQ_Codel"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/6Rs0p3mPNr0",
								                 d: "How NOT to measure latency - Gil Tene at USI"
							                 }
						                 ]
					                 },
					                 {
						                 t: "nginX",
						                 a: [
							                 {
								                 h: "https://www.youtube.com/embed/3Cdr8q1JXpM",
								                 d: "NGINX at Google Scale"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/jVCYaLEBCpU",
								                 d: "Scaling Web Applications with NGINX Load Balancing and Caching"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/eLW_NSuwYU0",
								                 d: "NGINX Performance Testing: Konstantin Pavlov @nginxconf 2014"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/CBh-jYYNLyo",
								                 d: "Adobe Powers Its API Gateway with NGINX"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/lr_AQIxcdlE",
								                 d: "PBS Manages Traffic Spikes with NGINX, Even During Downton Abbey"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/OaCLe812WpY",
								                 d: "Accelerating HTTPS Worldwide with an NGINX Based Edge Network"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Javascript, V8 & AngularJS 2",
						                 a: [
							                 {
								                 h: "https://www.youtube.com/embed/N1swY14jiKc",
								                 d: "V8, modern JavaScript, and beyond - Google I/O 2016"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/oDFWIb0pi4U",
								                 d: "V8 Performance from the Driver's Seat (Chrome Dev Summit 2015)"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/7gtf47D_bu0",
								                 d: "Bandwidth, latency, and radio performance - Crash course on web performance"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/7ubJzEi3HuA",
								                 d: "Speed, Performance, and Human Perception"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/PkOBnYxqj3k",
								                 d: "Critical rendering path - Crash course on web performance"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/rpNXWxMyzHQ",
								                 d: "Delivering 60 FPS in the browser - Crash course on web performance"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/etACK2qbHfc",
								                 d: "There is a client-side proxy (ServiceWorker) in your browser!"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/EwYD_xqB7Qs",
								                 d: "Angular 2 - Google I/O 2016"
							                 }
						                 ]
					                 },
					                 {
						                 t: "Node.js",
						                 a: [
							                 {
								                 h: "https://www.youtube.com/embed/p74282nDMX8",
								                 d: "Node.js at Netflix"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/ElI5QtUISWM",
								                 d: "Node.js at Uber"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/-00ImeLt9ec",
								                 d: "Node.js at PayPal"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/BJPeLJhv1Ic",
								                 d: "Node.js at CapitalOne"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/jm75pxsb80c",
								                 d: "Microservice Developer Experience"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/SYNJFX0oIBU",
								                 d: "Node.js for Enterprise APIs Panel Discussion"
							                 },
							                 {
								                 h: "https://www.youtube.com/embed/D9TUU5bK0iE",
								                 d: "Rebuilding the Ship as it Sails: Making Large Legacy Sites Responsive"
							                 }
						                 ]
					                 }
				                 ]
			                 },DOMSanitizer);
		};
		ReferenceService.parameters = [
			ng.platformBrowser.DomSanitizer
		];
		ReferenceService.prototype.rVEV = function() {
			this.sRe = false;
		};
		ReferenceService.prototype.toggleRE = function() {
			this.sRe = !this.sRe;
			return this.sRe;
		};
		ReferenceService.prototype.setRE = function(b) {
			this.sRe = b;
		};
		return ReferenceService;
	})();
})(window.app || (window.app = {}));
