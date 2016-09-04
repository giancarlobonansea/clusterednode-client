#!/usr/bin/env bash
java -jar /usr/local/lib/node_modules/google-closure-compiler/compiler.jar -O ADVANCED -W QUIET --language_out ECMASCRIPT5_STRICT --js_output_file compiled.js --assume_function_wrapper ./node_modules/socket.io-client/socket.io.js ./node_modules/intl/dist/Intl.min.js ./node_modules/intl/locale-data/jsonp/en.js ./node_modules/es6-shim/es6-shim.min.js ./node_modules/zone.js/dist/zone.min.js ./node_modules/reflect-metadata/Reflect.js ./node_modules/rxjs/bundles/Rx.umd.min.js ./node_modules/@angular/core/bundles/core.umd.min.js ./node_modules/@angular/common/bundles/common.umd.min.js ./node_modules/@angular/compiler/bundles/compiler.umd.min.js ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js ./node_modules/@angular/forms/bundles/forms.umd.min.js ./app.refdata.service.js ./app.http.umd.library.js ./app.httpg.service.js ./app.httpp.service.js ./app.charts.service.js ./app.googleanalytics.service.js ./app.liveredis.service.js ./app.load.service.js ./app.ng2nvd3.library.js ./app.reference.service.js ./app.stats.service.js ./app.simulator.component.html.js ./app.simulator.component.js ./app.module.js ./main.js
