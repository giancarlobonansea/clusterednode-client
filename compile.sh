#!/usr/bin/env bash
echo "---> Compiling"
#java -jar /usr/local/lib/node_modules/google-closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS -W QUIET --language_out ECMASCRIPT5 --generate_exports --export_local_property_definitions --assume_function_wrapper --output_module_dependencies dep.json --property_renaming_report prename.txt --variable_renaming_report vrename.txt --output_manifest manifest.txt --create_source_map compiled.js.map --js_output_file compiled.js --use_types_for_optimization ./node_modules/socket.io-client/socket.io.js ./node_modules/es6-shim/es6-shim.min.js ./node_modules/reflect-metadata/Reflect.js ./node_modules/rxjs/bundles/Rx.umd.min.js ./node_modules/@angular/core/bundles/core.umd.min.js ./node_modules/@angular/common/bundles/common.umd.min.js ./node_modules/@angular/compiler/bundles/compiler.umd.min.js ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js ./node_modules/@angular/forms/bundles/forms.umd.min.js ./app.http.umd.library.js ./app.refdata.service.js ./app.googleanalytics.service.js ./app.httpg.service.js ./app.httpp.service.js ./app.charts.service.js ./app.liveredis.service.js ./app.load.service.js ./app.ng2nvd3.library.js ./app.reference.service.js ./app.stats.service.js ./app.simulator.component.html.js ./app.simulator.component.js ./app.module.js ./main.js
uglifyjs ./node_modules/jquery/dist/jquery.min.js ./node_modules/bootstrap/dist/js/bootstrap.min.js ./node_modules/d3/d3.min.js ./node_modules/nvd3/build/nv.d3.min.js ./node_modules/socket.io-client/socket.io.js ./node_modules/intl/dist/Intl.min.js ./node_modules/intl/locale-data/jsonp/en.js ./node_modules/es6-shim/es6-shim.min.js ./node_modules/zone.js/dist/zone.min.js ./node_modules/reflect-metadata/Reflect.js ./node_modules/rxjs/bundles/Rx.umd.min.js ./node_modules/@angular/core/bundles/core.umd.min.js ./node_modules/@angular/common/bundles/common.umd.min.js ./node_modules/@angular/compiler/bundles/compiler.umd.min.js ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js ./node_modules/@angular/forms/bundles/forms.umd.min.js ./app.http.umd.library.js ./app.refdata.service.js ./app.googleanalytics.service.js ./app.httpg.service.js ./app.httpp.service.js ./app.charts.service.js ./app.liveredis.service.js ./app.load.service.js ./app.ng2nvd3.library.js ./app.reference.service.js ./app.stats.service.js ./app.simulator.component.html.js ./app.simulator.component.js ./app.module.js ./main.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m -r '$,require,exports' --wrap --export-all -o compiled.js --source-map compiled.js.map --source-map-include-sources
echo "---> Gzipping static files"
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
gzip -k9f ./execution-arch.png
gzip -k9f ./sequence-diagram.png
gzip -k9f ./index.html
gzip -k9f ./compiled.js
gzip -k9f ./compiled.js.map
