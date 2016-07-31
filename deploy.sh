#!/usr/bin/env bash
ssh -p 32012 -T pi@giancarlobonansea.homeip.net "cd ~/clusterednode-client; git fetch --force --all; git reset --hard origin/master; ./ugly.sh"
ssh -p 32013 -T pi@giancarlobonansea.homeip.net "cd ~/clusterednode-client; git fetch --force --all; git reset --hard origin/master; ./ugly.sh"
