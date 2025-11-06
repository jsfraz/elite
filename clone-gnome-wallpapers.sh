#!/bin/bash

# Create the backgrounds directory if it doesn't exist
mkdir -p "$PWD/.config/sway/backgrounds"

# Directory to clone the repository into
REPO_DIR="$PWD/all-gnome-backgrounds"

# If the repository already exists, pull the latest changes
if [ -d "$REPO_DIR" ]; then
    cd "$REPO_DIR"
    git pull
    if [ $? -ne 0 ]; then
        exit 1
    fi
    cd -
else
    git clone https://github.com/zebreus/all-gnome-backgrounds.git "$REPO_DIR"
    if [ $? -ne 0 ]; then
        exit 1
    fi
fi

# Check if the images directory exists
if [ ! -d "$REPO_DIR/data/images" ]; then
    exit 1
fi

echo "Copying images..."
# Move all images (recursively, if there are subdirectories)
cp -rf "$REPO_DIR/data/images/"* "$PWD/.config/sway/backgrounds/"
