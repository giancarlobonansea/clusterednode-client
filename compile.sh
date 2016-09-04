#!/usr/bin/env bash
echo "---> Compiling"
java -jar /usr/local/lib/node_modules/google-closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS -W QUIET --language_out ECMASCRIPT5 --generate_exports --export_local_property_definitions  --js_output_file compiled.js --externs ./node_modules/reflect-metadata/Reflect.js --externs ./node_modules/es6-shim/es6-shim.min.js --externs ./node_modules/socket.io-client/socket.io.js --externs ./app.googleanalytics.service.js ./node_modules/rxjs/bundles/Rx.umd.min.js ./node_modules/@angular/core/bundles/core.umd.min.js ./node_modules/@angular/common/bundles/common.umd.min.js ./node_modules/@angular/compiler/bundles/compiler.umd.min.js ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js ./node_modules/@angular/forms/bundles/forms.umd.min.js ./app.http.umd.library.js ./app.refdata.service.js ./app.httpg.service.js ./app.httpp.service.js ./app.charts.service.js ./app.liveredis.service.js ./app.load.service.js ./app.ng2nvd3.library.js ./app.reference.service.js ./app.stats.service.js ./app.simulator.component.html.js ./app.simulator.component.js ./app.module.js ./main.js
