(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule, ng.http.HttpModule, ng.forms.FormsModule ],
                             declarations: [ app.SimulatorComponent, nvD3 ],
                             bootstrap: [ app.SimulatorComponent ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));