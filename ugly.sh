#!/usr/bin/env bash
echo Minify app.httpservice.js
uglifyjs app.httpservice.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.httpservice.js --source-map app.httpservice.js.map --source-map-include-sources --stats
echo Minify app.simulator.js
uglifyjs app.simulator.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o app.simulator.js --source-map app.simulator.js.map --source-map-include-sources --stats
echo Minify http_profile.umd.js
uglifyjs http_profile.umd.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o http_profile.umd.js --source-map http_profile.umd.js.map --source-map-include-sources --stats
echo Minify main.js
uglifyjs main.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m toplevel,eval -r '$,require,exports' -o main.js --source-map main.js.map --source-map-include-sources --stats
echo Minify ng2-nvd3.js
uglifyjs ng2-nvd3.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=5 -m -r '$,require,exports' -o ng2-nvd3.js --stats
echo Finished minifying files
