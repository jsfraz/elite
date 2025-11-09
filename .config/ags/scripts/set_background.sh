#!/bin/sh

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
mkdir -p ~/.config/sway
if [ ! -f ~/.config/sway/config.json ]; then
    jq -n "{background: \"$BACKGROUND_FILE_EXPANDED\"}" > ~/.config/sway/config.json
else
    jq ".background = \"$BACKGROUND_FILE_EXPANDED\"" ~/.config/sway/config.json > ~/.config/sway/config.json.tmp && \
    mv ~/.config/sway/config.json.tmp ~/.config/sway/config.json
fi

# Set background image
swaymsg output "*" bg $BACKGROUND_FILE_EXPANDED fill

# TODO matugen
# pywal
wal -i $BACKGROUND_FILE_EXPANDED --saturate 0.5 -nste

# ags
ASTAL_BATTERY_DIR=$(dirname $(find /usr -name "*AstalBattery*.typelib" 2>/dev/null))
export GI_TYPELIB_PATH=$ASTAL_BATTERY_DIR:$GI_TYPELIB_PATH
killall -q gjs
while pgrep -x gjs >/dev/null; do sleep 0.1; done
ags run &