#!/usr/bin/env bash
#echo Minify app.charts.service.js
#uglifyjs app.charts.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.charts.service.js --source-map app.charts.service.js.map --source-map-include-sources
#echo Minify app.googleanalytics.service.js
#uglifyjs app.googleanalytics.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.googleanalytics.service.js --source-map app.googleanalytics.service.js.map --source-map-include-sources
#echo Minify app.httpg.service.js
#uglifyjs app.httpg.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.httpg.service.js --source-map app.httpg.service.js.map --source-map-include-sources
#echo Minify app.httpp.service.js
#uglifyjs app.httpp.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.httpp.service.js --source-map app.httpp.service.js.map --source-map-include-sources
#echo Minify app.liveredis.service.js
#uglifyjs app.liveredis.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.liveredis.service.js --source-map app.liveredis.service.js.map --source-map-include-sources
#echo Minify app.load.service.js
#uglifyjs app.load.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.load.service.js --source-map app.load.service.js.map --source-map-include-sources
#echo Minify app.module.js
#uglifyjs app.module.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.module.js --source-map app.module.js.map --source-map-include-sources
#echo Minify app.refdata.service.js
#uglifyjs app.refdata.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.refdata.service.js --source-map app.refdata.service.js.map --source-map-include-sources
#echo Minify app.reference.service.js
#uglifyjs app.reference.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.reference.service.js --source-map app.reference.service.js.map --source-map-include-sources
#echo Minify app.simulator.component.js
#uglifyjs app.simulator.component.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.simulator.component.js --source-map app.simulator.component.js.map --source-map-include-sources
#echo Minify app.stats.service.js
#uglifyjs app.stats.service.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.stats.service.js --source-map app.stats.service.js.map --source-map-include-sources
#echo Minify app.http.umd.library.js
#uglifyjs app.http.umd.library.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.http.umd.library.js --source-map app.http.umd.library.js.map --source-map-include-sources
#echo Minify main.js
#uglifyjs main.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o main.js --source-map main.js.map --source-map-include-sources
#echo Minify app.ng2nvd3.library.js
#uglifyjs app.ng2nvd3.library.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m -r '$,require,exports' -o app.ng2nvd3.library.js --source-map app.ng2nvd3.library.js.map --source-map-include-sources
#echo Minify Reflect.js
#uglifyjs ./node_modules/reflect-metadata/Reflect.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m -r '$,require,exports' -o ./node_modules/reflect-metadata/Reflect.js
#echo Minify socket.io.js
#uglifyjs ./node_modules/socket.io-client/socket.io.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m -r '$,require,exports' -o ./node_modules/socket.io-client/socket.io.js
#echo Finished minifying files
echo Gzipping static files
gzip -k9f ./favicon.png
gzip -k9f ./node_modules/bootstrap/dist/css/bootstrap.min.css
gzip -k9f ./node_modules/nvd3/build/nv.d3.min.css
gzip -k9f ./font-awesome-4.6.3/css/font-awesome.min.css
gzip -k9f ./font-awesome-4.6.3/fonts/fontawesome-webfont.woff2
gzip -k9f ./font-awesome-4.6.3/fonts/fontawesome-webfont.woff
gzip -k9f ./font-awesome-4.6.3/fonts/fontawesome-webfont.ttf
gzip -k9f ./font-awesome-4.6.3/fonts/fontawesome-webfont.svg
gzip -k9f ./font-awesome-4.6.3/fonts/fontawesome-webfont.eot
gzip -k9f ./font-awesome-4.6.3/fonts/FontAwesome.otf
gzip -k9f ./node_modules/jquery/dist/jquery.min.js
gzip -k9f ./node_modules/bootstrap/dist/js/bootstrap.min.js
gzip -k9f ./node_modules/d3/d3.min.js
gzip -k9f ./node_modules/nvd3/build/nv.d3.min.js
#gzip -k9f ./node_modules/socket.io-client/socket.io.js
gzip -k9f ./node_modules/intl/dist/Intl.min.js
gzip -k9f ./node_modules/intl/locale-data/jsonp/en.js
#gzip -k9f ./node_modules/es6-shim/es6-shim.min.js
#gzip -k9f ./node_modules/zone.js/dist/zone.min.js
#gzip -k9f ./node_modules/reflect-metadata/Reflect.js
#gzip -k9f ./node_modules/rxjs/bundles/Rx.umd.min.js
#gzip -k9f ./node_modules/@angular/core/bundles/core.umd.min.js
#gzip -k9f ./node_modules/@angular/common/bundles/common.umd.min.js
#gzip -k9f ./node_modules/@angular/compiler/bundles/compiler.umd.min.js
#gzip -k9f ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js
#gzip -k9f ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js
#gzip -k9f ./node_modules/@angular/forms/bundles/forms.umd.min.js
#gzip -k9f ./app.charts.service.js
#gzip -k9f ./app.googleanalytics.service.js
#gzip -k9f ./app.http.umd.library.js
#gzip -k9f ./app.httpg.service.js
#gzip -k9f ./app.httpp.service.js
#gzip -k9f ./app.liveredis.service.js
#gzip -k9f ./app.load.service.js
#gzip -k9f ./app.module.js
#gzip -k9f ./app.ng2nvd3.library.js
#gzip -k9f ./app.refdata.service.js
#gzip -k9f ./app.reference.service.js
#gzip -k9f ./app.simulator.component.js
#gzip -k9f ./app.stats.service.js
gzip -k9f ./execution-arch.png
gzip -k9f ./index.html
#gzip -k9f ./main.js
gzip -k9f ./sequence-diagram.png
#gzip -k9f ./app.simulator.component.html.js
gzip -k9f ./vendor.js
gzip -k9f ./compiled.js
echo Finished gzipping static files
