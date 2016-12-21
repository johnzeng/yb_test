#!/bin/sh

echo $@
node presence.js $@ &
sleep 5;node pubsub.js $@ &
wait %1 %2
