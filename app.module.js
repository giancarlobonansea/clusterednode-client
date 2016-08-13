(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule, ng.http.HTTP_PROVIDERS, ng.platformBrowser.BROWSER_SANITIZATION_PROVIDERS ],
                             declarations: [ app.AppSimulator ],
                             bootstrap: [ app.AppSimulator ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));