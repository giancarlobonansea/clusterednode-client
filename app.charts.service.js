"use strict";
(function(app) {
    app.ChartsService = (function() {
        var ChartsService = function(RefData) {
            this._s_PI = RefData._s_PI;
            this._s_STG = ['-redis',
                           '-node',
                           '-nginx',
                           '-angular'];
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
            this.dataInit();
        };
        ChartsService.parameters = [
            app.RefDataService
        ];
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
        ChartsService.prototype.setBcd = function(i, l, v) {
            this.bcd[i].values.push({
                                   label: l,
                                   value: v
                               });
        };
        ChartsService.prototype.dataInit = function() {
            var cPC = function(k) {
                return {
                    key: k,
                    y: 0
                };
            },
                cBC = function(k1, k2) {
                    return {
                        key: k1 + k2,
                        values: []
                    };
                };
            this.bcd = [];
            this.pcd = [cPC(this._s_PI[0]),
                       cPC(this._s_PI[1]),
                       cPC(this._s_PI[2]),
                       cPC(this._s_PI[3])];
            this.pcd2 = [cPC(this._s_PI[0]),
                        cPC(this._s_PI[1]),
                        cPC(this._s_PI[2]),
                        cPC(this._s_PI[3])];
            this.lcd = [
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
            ];
            //
            // Populate barchart structure
            //
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    this.bcd.push(cBC(this._s_PI[j], this._s_STG[i]));
                }
            }
        };
        return ChartsService;
    })();
})(window.app || (window.app = {}));
