(function(app) {
    app.AppModule =
        ng.core.NgModule({
                             imports: [ ng.platformBrowser.BrowserModule ],
                             declarations: [ app.AppSimulator ],
                             bootstrap: [ app.AppSimulator ]
                         })
            .Class({
                       constructor: function() {}
                   });
})(window.app || (window.app = {}));