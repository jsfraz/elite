# elite

Rice for my shit Elitebook 840.

# TODO screenshot

Wallpapers come from [gnome-backgrounds package](https://zebreus.github.io/all-gnome-backgrounds/wallpaper/70140479abcf51913eca764c686068c2e643a685).

## Dependencies

- git
- [swayfx](https://github.com/WillPower3309/swayfx)
- [ags](https://github.com/Aylur/ags)
- [rofi-wayland](https://github.com/davatorium/rofi)
- [grimshot](https://sr.ht/~emersion/grim/) ([sway-contrib package](https://github.com/OctopusET/sway-contrib))
- [pywal](https://github.com/dylanaraps/pywal)
- [FiraCode Nerd Font](https://www.nerdfonts.com)
- [AstalBattery](https://aylur.github.io/astal/guide/libraries/battery) (run `ags types` after installing)
- [libnotify](https://gitlab.gnome.org/GNOME/libnotify)
- [mako](https://github.com/emersion/mako)
- [jq](https://github.com/jqlang/jq)
- [ydotool](https://github.com/ReimuNotMoe/ydotool)
- [gnome-system-monitor](https://gitlab.gnome.org/GNOME/gnome-system-monitor)

## swayfx

### Linking config folder

```bash
ln -sf $PWD/.config/sway ~/.config/sway
```

## ags

> [!NOTE]
> If you run into this error: `can not initialize layer shell on window: layer shell not supported
tip: running from an xwayland terminal can cause this, for example VsCode` you need to run this in a native wayland terminal like `alacritty` or `foot`.

### Linking config folder

```bash
ln -sf $PWD/.config/ags ~/.config/ags
```

### Generating SCSS manully

To run `ags`, you need to generate SCSS using `pwal` and symlink it to `ags` folder:

```bash
wal -i $BACKGROUND_FILE --saturate 0.5 && ln -s ~/.cache/wal ~/.config/ags/wal
```

### Starting manually

When starting `ags` manually, make sure the `GI_TYPELIB_PATH` includes the path to `AstalBattery` typelib:

```bash
export GI_TYPELIB_PATH=$(dirname $(find /usr -name "*AstalBattery*.typelib" 2>/dev/null)):$GI_TYPELIB_PATH
ags run
```

This is done automatically when using provided `sway` config.

## ydotool

You need to run `ydotool` deamon as root to use cursor positioning script. Create a systemd service file at `/etc/systemd/system/ydotool.service` with

```bash
[Unit]
Description=Starts ydotoold service

[Service]
Type=simple
Restart=always
ExecStart=ydotoold --socket-path="/tmp/.ydotool_socket" --socket-own="1000:1000"
ExecReload=kill -HUP $MAINPID
KillMode=process
TimeoutSec=180

[Install]
WantedBy=default.target
```

Then enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ydotool.service
sudo systemctl start ydotool.service
```