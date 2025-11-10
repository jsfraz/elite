#!/bin/bash

# Wait for Sway to be running and socket to be available (max 10 seconds)
for i in {1..20}; do
    SWAY_PID=$(pgrep -x sway)
    if [ -n "$SWAY_PID" ]; then
        # https://github.com/swaywm/sway/issues/3769#issuecomment-1807181019
        export SWAYSOCK=/run/user/$(id -u)/sway-ipc.$(id -u).${SWAY_PID}.sock
        if [ -S "$SWAYSOCK" ]; then
            break
        fi
    fi
    sleep 0.5
done

# Check if socket is available before trying to reload
if [ -n "$SWAYSOCK" ] && [ -S "$SWAYSOCK" ]; then
    swaymsg reload
else
    echo "Sway socket not available, skipping reload" >&2
    exit 0
fi

# Check whether to send notification
if [ ! -f ~/.config/sway/config.json ]; then
    exit 0
fi
if [ "$(darkman get)" = "$(jq -r '.mode' ~/.config/sway/config.json 2>/dev/null)" ]; then
    exit 0
fi

# Wait for notification service to be available (max 5 seconds)
if ! pgrep -x mako > /dev/null; then
    for i in {1..10}; do
        if pgrep -x mako > /dev/null; then
            break
        fi
        sleep 0.5
    done
    # Additional wait for notification daemon
    sleep 1
fi

notify-send "Changed theme" "$(darkman get)"