#!/bin/bash

COLOR=red
MODE=$(darkman get)

# Create ~/.config/sway/config.json with default background
if [ ! -f ~/.config/sway/config.json ]; then
    jq -n '{background: "~/.config/sway/backgrounds/LightWaves-b4b59bda185758ebaa2735e4e9fc78a2f7277c64.webp", mode: "'$MODE'", color: "'$COLOR'"}' > ~/.config/sway/config.json
fi

# GTK theme
# gsettings list-recursively org.gnome.desktop.interface
gsettings set org.gnome.desktop.interface gtk-theme "Orchis-${COLOR^}-${MODE^}-Compact"
gsettings set org.gnome.desktop.interface color-scheme "prefer-$MODE"
gsettings set org.gnome.desktop.interface icon-theme "Adwaita-${COLOR}"
# TODO cursor-theme

# Background file
BACKGROUND_FILE=$(jq -r '.background' ~/.config/sway/config.json)

# Expand ~ to home directory
BACKGROUND_FILE_EXPANDED="${BACKGROUND_FILE/#\~/$HOME}"

# Set background image
swaymsg output "*" bg $BACKGROUND_FILE_EXPANDED fill

# matugen
matugen image $BACKGROUND_FILE_EXPANDED -m $MODE

# ags
ASTAL_BATTERY_DIR=$(dirname $(find /usr -name "*AstalBattery*.typelib" 2>/dev/null))
export GI_TYPELIB_PATH=$ASTAL_BATTERY_DIR:$GI_TYPELIB_PATH
killall -q gjs
while pgrep -x gjs >/dev/null; do sleep 0.1; done
ags run &

# mako
mako
