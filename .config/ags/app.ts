import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./components/bar/Bar"
import PowerMenu from "./components/powerMenu/PowerMenu"
import Menu from "./components/menu/menu"
import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"
import { MenuOption } from "./utils/menuOption"

const SUBMENU_MARGIN_LEFT = 5;
const SUBMENU_MARGIN_TOP = 10;

const MENU_OPTIONS: Array<MenuOption> = [
  new MenuOption({
    label: "System Monitor",
    action: () => {
      execAsync(["gnome-system-monitor"])
    }
  }),
  new MenuOption({
    label: "Settings",
    submenu: [
      new MenuOption({ label: "Change background" })
    ],
    parentWindowName: "main-menu"
  }),
  new MenuOption({
    isSeparator: true
  }),
  new MenuOption({
    label: "Power",
    action: () => {
      app.toggle_window("power-menu");
      execAsync(["scripts/cursor_middle.sh", "-plusX", "107"]);
    }
  }),
];

// Prepare submenus and return them as windows
function setupSubmenus(submenuOptions: Array<MenuOption>, gdkmonitor: Gdk.Monitor): void {
  submenuOptions.forEach((option, index) => {
    if (option.submenu) {
      const ENTRY_HEIGHT = 27;
      const SEPARATOR_HEIGHT = 1;
      // Calculate how many items are before this submenu
      let plusMargin = 0;
      for (let i = 0; i < index; i++) {
        if (submenuOptions[i].isSeparator) {
          plusMargin += SEPARATOR_HEIGHT;
        } else {
          plusMargin += ENTRY_HEIGHT;
        }
      }
      // Menu instance for submenu
      Menu(
        gdkmonitor,
        option.submenu!,
        {
          name: `submenu-${option.getHash()}`,
          parentWindowName: option.parentWindowName,
          plusMarginLeft: SUBMENU_MARGIN_LEFT + 1,
          plusMarginTop: SUBMENU_MARGIN_TOP + plusMargin
        }
      )
    }
  });
}

app.start({
  css: style,
  main() {
    // TODO validate monitors

    app.get_monitors().map(Bar);
    app.get_monitors().map(PowerMenu);
    app.get_monitors().map((m) => Menu(m, MENU_OPTIONS, { plusMarginTop: SUBMENU_MARGIN_TOP, plusMarginLeft: SUBMENU_MARGIN_LEFT }));
    app.get_monitors().map((m) => {
      setupSubmenus(MENU_OPTIONS, m);
    });
  },
})
