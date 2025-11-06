import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./components/bar/Bar"
import PowerMenu from "./components/powerMenu/PowerMenu"
import MainMenu, { MenuOption } from "./components/menu/menu"
import { execAsync } from "ags/process"

const MENU_OPTIONS: Array<MenuOption> = [{
  label: "System Monitor",
  action: () => {
    execAsync(["gnome-system-monitor"]);
  },
  isSeparator: false,
},
{
  label: "Settings",
  action: () => {

  },
  isSeparator: false,
},
{
  label: "",
  action: () => { },
  isSeparator: true,
},
{
  label: "Power",
  action: () => {
    app.toggle_window("power-menu");
    execAsync(["scripts/cursor_middle.sh", "-plusX", "107"]);
  },
  isSeparator: false,
},
];

app.start({
  css: style,
  main() {
    // TODO validate monitors

    app.get_monitors().map(Bar);
    app.get_monitors().map(PowerMenu);
    app.get_monitors().map((m) => MainMenu(m, MENU_OPTIONS));
  },
})
