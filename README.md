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
