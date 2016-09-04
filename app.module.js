(function(app) {
    app.AppModule =
        oa.core.NgModule({
                             imports: [ oa.platformBrowser.BrowserModule, oa.http.HttpModule, oa.forms.FormsModule ],
                             declarations: [ app.SimulatorComponent, nvD3 ],
                             bootstrap: [ app.SimulatorComponent ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));