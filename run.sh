#!/bin/sh

echo $@
node presence.js $@ &
presence_pid=$!

sleep 2
node pubsub.js $@ &
pubsub_pid=$!

sleep 2
node alias.js $@ &
alias_pid=$!

# set a bomber so it will end if this his timeout
(sleep 10; echo 'timeout!';kill ${presence_pid}; kill ${pubsub_pid}; kill ${alias_pid})&

echo 'now wait'
wait %1 %2 %3
echo 'now kill bomber'
kill %4
