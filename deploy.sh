#!/usr/bin/env bash
echo "---> RaspberryPi9"
ssh -p 32012 -T pi@giancarlobonansea.homeip.net "cd ~/clusterednode-client; git fetch --force --all; git reset --hard origin/master; ./ugly.sh"
echo "---> RaspberryPi10"
ssh -p 32013 -T pi@giancarlobonansea.homeip.net "cd ~/clusterednode-client; git fetch --force --all; git reset --hard origin/master; ./ugly.sh"
