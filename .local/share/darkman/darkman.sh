#!/bin/bash

# Restart sway config
# https://github.com/swaywm/sway/issues/3769#issuecomment-1807181019
export SWAYSOCK=/run/user/$(id -u)/sway-ipc.$(id -u).$(pgrep -x sway).sock
swaymsg reload

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