#!/bin/bash

# Directory to clone the repository into
REPO_DIR="$PWD/gnome-runcat"

# If the repository already exists, pull the latest changes
if [ -d "$REPO_DIR" ]; then
    cd "$REPO_DIR"
    git pull
    if [ $? -ne 0 ]; then
        exit 1
    fi
    cd -
else
    git clone https://github.com/win0err/gnome-runcat.git "$REPO_DIR"
    if [ $? -ne 0 ]; then
        exit 1
    fi
fi

# Check if the icons directory exists
if [ ! -d "$REPO_DIR/src/resources/icons/runcat" ]; then
    echo "Icons directory not found!"
    exit 1
fi

echo "Copying runcat icons..."
# Copy all runcat icons
cp -rf "$REPO_DIR/src/resources/icons/runcat" "$PWD/.config/ags/icons/"

rm -rf "$REPO_DIR"

# Create LICENSE file with attribution
cat > "$PWD/.config/ags/icons/runcat/LICENSE" << 'EOF'
Runcat icons from https://github.com/win0err/gnome-runcat
Copyright (c) Sergei Kolesnikov
Licensed under GPL-3.0
EOF

echo "Icons installed successfully to .config/ags/icons/runcat/"