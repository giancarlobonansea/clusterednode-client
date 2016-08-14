"use strict";
(function(app) {
    app.ChartsService = (function() {
        var ChartsService = function() {
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
        };
        //// initCharts
        ChartsService.prototype.cP = function(t) {
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
        };
        return ChartsService;
    })();
})(window.app || (window.app = {}));
