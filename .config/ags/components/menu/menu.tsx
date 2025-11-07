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
      }}
    >
      <Gtk.EventControllerMotion
        onLeave={(_) => {
          // cancel();
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
                if (item.submenu) return;
                if (item.action) item.action();
                cancel();
              }}
            >
              <Gtk.EventControllerMotion
                onEnter={(_) => {
                  if (item.submenu) {
                    app.toggle_window(`submenu-${item.getHash()}`);
                  }
                }}
                onLeave={(_) => {
                  if (item.submenu) {
                    app.toggle_window(`submenu-${item.getHash()}`);
                  }
                }}
              />
              <label
                class="vpadding0"
                label={item.label ? item.label : ""}
                halign={Gtk.Align.START}
                hexpand={true}
              />
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