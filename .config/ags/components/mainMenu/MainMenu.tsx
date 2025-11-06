import { Accessor, createState, For } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";

function cancel() {
  app.toggle_window("main-menu")
}

export interface MenuOption {
  label: string;
  action: () => void;
  isSeparator: boolean;
}

export default function MainMenu(gdkmonitor: Gdk.Monitor) {
  const [visible, _setVisible] = createState(false);
  const [animate, _setAnimate] = createState(false);
  const { TOP, LEFT } = Astal.WindowAnchor

  /*
  const OPTIONS = new Accessor<Array<string>>(() => [
    "System Monitor",
    "Settings",
    "Power",
  ]);
  */

  const OPTIONS = new Accessor<Array<MenuOption>>(() => [
    {
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
  ]);

  return (
    <window
      name="main-menu"
      application={app}
      class="MainMenu glass-menu"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      marginTop={10}
      marginLeft={5}
      anchor={TOP | LEFT}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.ON_DEMAND}
      visible={visible}
      onShow={(self) => {
        self.grab_focus();
        _setAnimate(true);
      }}
      onHide={() => {
        _setAnimate(false);
      }}
    >
      <Gtk.EventControllerMotion
        onLeave={(_) => {
          cancel();
        }}
      />
      <box class="power-menu-content" orientation={Gtk.Orientation.VERTICAL} spacing={1}>
        <For each={OPTIONS}>
          {(item, _: Accessor<number>) => (
            !item.isSeparator ? (<button
              class={animate((val) => `power-button vpadding1 transparentThenHoverFg ${val ? "animate" : ""}`)}
              hexpand={true}
              halign={Gtk.Align.FILL}
              onClicked={() => {
                item.action();
                cancel();
              }}
            >
              <label
                class="vpadding0"
                label={item.label}
                halign={Gtk.Align.START}
                hexpand={true}
              />
            </button>) : (
              <Gtk.Separator
              class={animate((val) => `power-button ${val ? "animate" : ""}`)}
              />)
          )}
        </For>
      </box>
    </window>
  );
}