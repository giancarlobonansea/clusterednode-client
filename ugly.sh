#!/usr/bin/env bash
uglifyjs app.httpservice.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=3 -m toplevel,eval -r '$,require,exports' -o app.httpservice.js
uglifyjs app.simulator.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=3 -m toplevel,eval -r '$,require,exports' -o app.simulator.js
uglifyjs http_profile.umd.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=3 -m toplevel,eval -r '$,require,exports' -o http_profile.umd.js
uglifyjs main.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=3 -m toplevel,eval -r '$,require,exports' -o main.js
uglifyjs ng2-nvd3.js --screw-ie8 -c sequences,dead_code,conditionals,comparisons,unsafe_comps,evaluate,booleans,loops,unused,if_return,join_vars,collapse_vars,cascade,passes=3 -m -r '$,require,exports' -o ng2-nvd3.js
