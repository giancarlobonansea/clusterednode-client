(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule ],
                             declarations: [ app.SimulatorComponent ],
                             bootstrap: [ app.SimulatorComponent ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));