import { Accessor, createState, For } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app";
import { MenuOption } from "../../utils/menuOption";

function cancel() {
  app.toggle_window("main-menu")
}

export default function Menu(gdkmonitor: Gdk.Monitor, menuOptions: Array<MenuOption>, { name = "main-menu", parentWindowName = "", plusMarginTop = 0, plusMarginLeft = 0 } = {}) {
  const OPTIONS = new Accessor<Array<MenuOption>>(() => menuOptions);
  const { TOP, LEFT } = Astal.WindowAnchor
  const [visible, _setVisible] = createState(false);
  const [animate, _setAnimate] = createState(false);
  const [parentWindow, _setParentWindow] = createState<Gtk.Window | null>(null);
  const [activeSubmenu, _setActiveSubmenu] = createState<string | null>(null);

  function closeAllSubmenus() {
    let subMenus = OPTIONS.get().filter((item) => item.submenu);
    subMenus.forEach((item) => {
      let window = app.get_window(`submenu-${item.getHash()}`);
      if (window && window.get_visible()) {
        window.set_visible(false);
      }
    });
    _setActiveSubmenu(null);
  }

  function isAnySubmenuOpen() {
    let subMenus = OPTIONS.get().filter((item) => item.submenu);
    return subMenus.some((item) => {
      let window = app.get_window(`submenu-${item.getHash()}`);
      return window ? window.get_visible() : false;
    });
  }

  return (
    <window
      name={name}
      application={app}
      class="Menu glass-menu"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      marginTop={plusMarginTop}
      marginLeft={parentWindow((p) => {
        return p ? p.get_width() + plusMarginLeft : plusMarginLeft;
      })}
      anchor={TOP | LEFT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.ON_DEMAND}
      visible={visible}
      onShow={(self) => {
        self.grab_focus();
        if (parentWindowName != "") {
          const parentWindow = app.get_window(parentWindowName);
          if (parentWindow) {
            _setParentWindow(parentWindow);
          }
        }
        _setAnimate(true);
      }}
      onHide={() => {
        _setAnimate(false);
        closeAllSubmenus();
      }}
    >
      <Gtk.EventControllerMotion
        onLeave={(_) => {
          if (isAnySubmenuOpen()) return;
          cancel();
        }}
      />
      <box class="menu-content" orientation={Gtk.Orientation.VERTICAL} spacing={1}>
        <For each={OPTIONS}>
          {(item, _: Accessor<number>) => (
            !item.isSeparator ? (<button
              class={animate((val) => `menu-button vpadding1 transparentThenHoverFg ${val ? "animate" : ""}`)}
              hexpand={true}
              halign={Gtk.Align.FILL}
              onClicked={() => {
                if (item.submenu) {
                  const submenuName = `submenu-${item.getHash()}`;
                  if (activeSubmenu.get() === submenuName) {
                    app.toggle_window(submenuName);
                    _setActiveSubmenu(null);
                  } else {
                    closeAllSubmenus();
                    app.toggle_window(submenuName);
                    _setActiveSubmenu(submenuName);
                  }
                  return;
                }
                if (item.action) item.action();
                cancel();
              }}
            >
              <Gtk.EventControllerMotion
                onEnter={(_) => {
                  if (item.submenu) {
                    const submenuName = `submenu-${item.getHash()}`;
                    if (activeSubmenu.get() !== submenuName) {
                      closeAllSubmenus();
                      app.toggle_window(submenuName);
                      _setActiveSubmenu(submenuName);
                    }
                  } else {
                    // Close any open submenu when hovering over a non-submenu item
                    if (activeSubmenu.get() !== null) {
                      closeAllSubmenus();
                    }
                  }
                }}
              />
              <box spacing={8}>
                <label
                  class="vpadding0"
                  label={(item.icon ? item.icon + " " : "") + (item.label ? item.label : "")}
                  halign={Gtk.Align.START}
                  hexpand={true}
                />
                {item.submenu && (
                  <label
                    class="vpadding0"
                    label=""
                    halign={Gtk.Align.END}
                  />
                )}
              </box>
            </button>) : (
              <Gtk.Separator
                class={animate((val) => `menu-button ${val ? "animate" : ""}`)}
              />)
          )}
        </For>
      </box>
    </window>
  );
}