(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule, ng.http.HttpModule, ng.forms.FormsModule ],
                             declarations: [ app.SimulatorComponent ],
                             bootstrap: [ app.SimulatorComponent ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));