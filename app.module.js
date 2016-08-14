(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule, ng.common.DeprecatedFormsModule ],
                             declarations: [ app.AppSimulator ],
                             bootstrap: [ app.AppSimulator ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));