# elite

Rice for my shit Elitebook 840.

# TODO screenshot

## Dependencies

- git
- [swayfx](https://github.com/WillPower3309/swayfx)
- [ags](https://github.com/Aylur/ags)
- [rofi-wayland](https://github.com/davatorium/rofi)
- [grimshot](https://sr.ht/~emersion/grim/) ([sway-contrib package](https://github.com/OctopusET/sway-contrib))
- [matugen](https://github.com/InioX/matugen)
- [FiraCode Nerd Font](https://www.nerdfonts.com)
- [AstalBattery](https://aylur.github.io/astal/guide/libraries/battery) (run `ags types` after installing)
- [libnotify](https://gitlab.gnome.org/GNOME/libnotify)
- [mako](https://github.com/emersion/mako)
- [jq](https://github.com/jqlang/jq)
- [ydotool](https://github.com/ReimuNotMoe/ydotool)
# TODO change
- [gnome-system-monitor](https://gitlab.gnome.org/GNOME/gnome-system-monitor)
- [zenity-gtk3](https://aur.archlinux.org/packages/zenity-gtk3) (or [zenity](https://gitlab.gnome.org/GNOME/zenity) if not available)
- [darkman](https://gitlab.com/WhyNotHugo/darkman)
- [nemo](https://github.com/linuxmint/nemo)
- [Orchis-theme](https://github.com/vinceliuice/Orchis-theme) (`./install.sh -t all -s compact`)
- [MoreWaita](https://github.com/somepaulo/MoreWaita)
- [Adwaita-colors](https://github.com/dpejoh/Adwaita-colors) (run `sudo ./morewaita.sh` after installing MoreWaita and Adwaita-colors)

## swayfx

### Linking config folder

```bash
ln -sf $PWD/.config/sway ~/.config/sway
```

### Installing backgrounds

Download all the [GOOD](https://zebreus.github.io/all-gnome-backgrounds/) backgrounds from [all-gnome-backgrounds](https://github.com/zebreus/all-gnome-backgrounds) using this command:

```bash
./install_all_gnome_backgrounds.sh
```

## matugen

`matugen` is used to generate SCSS files for other programs based on the current background image.

## ags

> [!NOTE]
> If you run into this error: `can not initialize layer shell on window: layer shell not supported
tip: running from an xwayland terminal can cause this, for example VsCode` you need to run this in a native wayland terminal like `alacritty` or `foot`.

### Linking config folders

```bash
ln -sf $PWD/.config/ags ~/.config/ags
```

### Installing runcat icons from original repo

I've created a [runcat](https://github.com/win0err/gnome-runcat)-like icon on the sidebar. You can download the icons from the original repo in order to run `ags` without errors:

```bash
./install_runcat_icons.sh
```

### Generating SCSS manully

To run `ags`, you need to generate SCSS using `matugen`:

```bash
matugen image <image_path> -m <dark|light>
# or using this rice background config
# TODO -m flag
BACKGROUND_FILE=$(jq -r '.background' ~/.config/sway/config.json)
matugen image $BACKGROUND_FILE
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

## darkman

To manage dark/light themes automatically based on the time of day.

### Linking config folders

```bash
ln -sf $PWD/.config/darkman ~/.config/darkman
ln -sf $PWD/.local/share/darkman ~/.local/share/darkman
```

You can edit `lat` and `lng` in `~/.config/darkman/config.yml`.

After installing and creating config, enable the user service:

```bash
systemctl --user enable --now darkman.service
```