#!/bin/sh

echo $@
node presence.js $@ &
presence_pid=$!

sleep 2
node pubsub.js $@ &
pubsub_pid=$!
echo 'now wait'
# set a boomer so it will end if this his timeout

(sleep 10; echo 'timeout';kill $presence_pid; kill $pubsub_pid)&

wait %1 %2
kill %3
