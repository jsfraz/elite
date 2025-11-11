#!/usr/bin/env python3

# sudo pacman -S python-pillow

import sys
from PIL import Image
from collections import Counter
import colorsys

def get_dominant_color(image_path):
    """Gets the dominant color from an image."""
    img = Image.open(image_path)
    img = img.convert('RGB')
    img = img.resize((150, 150))  # Reduce size for faster processing
    
    pixels = list(img.getdata())
    
    # Filter out very dark and very light pixels
    pixels = [p for p in pixels if sum(p) > 50 and sum(p) < 700]
    
    if not pixels:
        return (128, 128, 128)  # Gray as fallback
    
    # Find the most common color
    most_common = Counter(pixels).most_common(1)[0][0]
    return most_common

def rgb_to_color_name(rgb):
    """Converts RGB to color name."""
    r, g, b = rgb
    h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
    
    # If the color has almost no saturation, it's gray/slate
    if s < 0.15:
        return "slate"
    
    # Convert hue (0-1) to degrees (0-360)
    hue = h * 360
    
    # Map hue to colors
    if hue < 15 or hue >= 345:
        return "red"
    elif 15 <= hue < 35:
        return "orange"
    elif 35 <= hue < 65:
        return "yellow"
    elif 65 <= hue < 150:
        return "green"
    elif 150 <= hue < 180:
        return "teal"
    elif 180 <= hue < 260:
        return "blue"
    elif 260 <= hue < 290:
        return "purple"
    elif 290 <= hue < 330:
        return "pink"
    elif 330 <= hue < 345:
        # Area between pink and red - decision based on brightness
        if v > 0.6:
            return "pink"
        else:
            return "red"
    else:
        # Fallback to brown for ambivalent cases
        if v < 0.4 and 20 <= hue < 50:
            return "brown"
        return "slate"

def main():
    if len(sys.argv) != 2:
        print("Usage: python get_color.py <image_path>", file=sys.stderr)
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    try:
        dominant_rgb = get_dominant_color(image_path)
        color_name = rgb_to_color_name(dominant_rgb)
        print(color_name)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()