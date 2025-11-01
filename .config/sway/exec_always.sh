#!/bin/sh

# Create ~/.config/sway/config.json with default background
if [ ! -f ~/.config/sway/config.json ]; then
    jq -n '{background: "~/.config/sway/backgrounds/LightWaves-b4b59bda185758ebaa2735e4e9fc78a2f7277c64.webp"}' > ~/.config/sway/config.json
fi

# Background
BACKGROUND_FILE=$(jq -r '.background' ~/.config/sway/config.json)
swaymsg output "*" bg $BACKGROUND_FILE fill

# pywal
wal -i $BACKGROUND_FILE --saturate 0.5 && ln -s ~/.cache/wal ~/.config/ags/wal

# ags
ASTAL_BATTERY_DIR=$(dirname $(find /usr -name "*AstalBattery*.typelib" 2>/dev/null))
export GI_TYPELIB_PATH=$ASTAL_BATTERY_DIR:$GI_TYPELIB_PATH

killall -q gjs
while pgrep -x gjs >/dev/null; do sleep 0.1; done
ags run &

# mako
mako