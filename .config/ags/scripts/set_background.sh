#!/bin/bash

# Choose background file
BACKGROUND_FILE=$(zenity --file-selection \
    --title="Choose background image" \
    --filename="$HOME/.config/sway/backgrounds/" \
    --file-filter="Images | *.jpg *.jpeg *.png *.webp *.bmp" \
    --file-filter="All files | *")

# Check if user canceled the selection
if [ -z "$BACKGROUND_FILE" ]; then
    exit 0
fi

# Expand ~ to home directory
BACKGROUND_FILE_EXPANDED="${BACKGROUND_FILE/#\~/$HOME}"

# Create or update ~/.config/sway/config.json with background path
# TODO color
COLOR=red
MODE=$(darkman get)
if [ ! -f ~/.config/sway/config.json ]; then
    jq -n "{background: \"$BACKGROUND_FILE_EXPANDED\", mode: \"$MODE\", color: \"$COLOR\"}" > ~/.config/sway/config.json
else
    jq ".background = \"$BACKGROUND_FILE_EXPANDED\" | .mode = \"$MODE\" | .color = \"$COLOR\"" ~/.config/sway/config.json > ~/.config/sway/config.json.tmp && \
    mv ~/.config/sway/config.json.tmp ~/.config/sway/config.json
fi

# GTK theme
# gsettings list-recursively org.gnome.desktop.interface
gsettings set org.gnome.desktop.interface gtk-theme "Orchis-${COLOR^}-${MODE^}-Compact"
gsettings set org.gnome.desktop.interface color-scheme "prefer-$MODE"
# TODO cursor-theme, icon-theme

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