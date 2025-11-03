#!/bin/bash

PLUS_X=0
PLUS_Y=0

# Parsování arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -plusX)
      PLUS_X="$2"
      shift 2
      ;;
    -plusY)
      PLUS_Y="$2"
      shift 2
      ;;
    *)
      echo "Unknown parameter: $1"
      echo "Usage: $0 [-plusX value] [-plusY value]"
      exit 1
      ;;
  esac
done

OUTPUT_INFO=$(swaymsg -t get_outputs | jq -r '.[] | select(.focused) | "\(.rect.width) \(.rect.height)"')
SCREEN_WIDTH=$(echo "$OUTPUT_INFO" | awk '{print $1}')
SCREEN_HEIGHT=$(echo "$OUTPUT_INFO" | awk '{print $2}')

CENTER_X=$((SCREEN_WIDTH / 4 + (PLUS_X / 2)))
CENTER_Y=$((SCREEN_HEIGHT / 4 + (PLUS_Y / 2)))

export YDOTOOL_SOCKET="/tmp/.ydotool_socket"
ydotool mousemove --absolute $CENTER_X $CENTER_Y