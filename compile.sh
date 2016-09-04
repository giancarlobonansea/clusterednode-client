#!/usr/bin/env bash
echo "---> Compiling"
java -jar /usr/local/lib/node_modules/google-closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS -W QUIET --language_out ECMASCRIPT5 --generate_exports --export_local_property_definitions --assume_function_wrapper --output_module_dependencies dep.json --property_renaming_report prename.txt --variable_renaming_report vrename.txt --output_manifest manifest.txt --create_source_map compiled.js.map --js_output_file compiled.js ./node_modules/socket.io-client/socket.io.js ./node_modules/es6-shim/es6-shim.min.js ./node_modules/zone.js/dist/zone.min.js ./node_modules/reflect-metadata/Reflect.js ./node_modules/rxjs/bundles/Rx.umd.min.js ./node_modules/@angular/core/bundles/core.umd.min.js ./node_modules/@angular/common/bundles/common.umd.min.js ./node_modules/@angular/compiler/bundles/compiler.umd.min.js ./node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js ./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js ./node_modules/@angular/forms/bundles/forms.umd.min.js ./app.http.umd.library.js ./app.refdata.service.js ./app.googleanalytics.service.js ./app.httpg.service.js ./app.httpp.service.js ./app.charts.service.js ./app.liveredis.service.js ./app.load.service.js ./app.ng2nvd3.library.js ./app.reference.service.js ./app.stats.service.js ./app.simulator.component.html.js ./app.simulator.component.js ./app.module.js ./main.js
