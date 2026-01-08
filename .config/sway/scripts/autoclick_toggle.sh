#!/bin/sh

AUTOCLICK_ENABLED=$(jrch get autoclick_enabled)
AUTOCLICK_INTERVAL=$(jrch get autoclick_interval)

if [ "$AUTOCLICK_ENABLED" = "true" ]; then
    AUTOCLICK_ENABLED="false"
else
    AUTOCLICK_ENABLED="true"
fi

jrch set autoclick_enabled "$AUTOCLICK_ENABLED"

if [ "$AUTOCLICK_ENABLED" = "true" ]; then
    notify-send "Autoclick" "Enabled ($AUTOCLICK_INTERVAL ms)"

    # Stop any existing clicking process
    pkill -f "ydotool.*click"
    
    # Start clicking in background
    while true; do
        export YDOTOOL_SOCKET="/tmp/.ydotool_socket"
        ydotool click 0xC0
        sleep $(awk "BEGIN {print $AUTOCLICK_INTERVAL / 1000}")
    done &
    
    # Save PID for later cleanup
    echo $! > /tmp/autoclick.pid
else
    notify-send "Autoclick" "Disabled"

    # Stop clicking process
    if [ -f /tmp/autoclick.pid ]; then
        kill $(cat /tmp/autoclick.pid) 2>/dev/null
        rm /tmp/autoclick.pid
    fi
    pkill -f "ydotool.*click"
fi