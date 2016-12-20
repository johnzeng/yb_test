#!/bin/sh

echo $@
node presence.js $@ &
sleep 5;node index.js $@ &
wait %1 %2
