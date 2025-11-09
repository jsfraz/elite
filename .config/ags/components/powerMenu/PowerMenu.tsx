import { createState } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";

// https://aylur.github.io/ags/guide/first-widgets.html#widget-signal-handlers

function shutdown() {
  execAsync(["systemctl", "poweroff"]).catch(console.error);
}

function reboot() {
  execAsync(["systemctl", "reboot"]).catch(console.error);
}

function cancel() {
  app.toggle_window("power-menu")
}

export default function PowerMenu(gdkmonitor: Gdk.Monitor) {
  const [visible, _setVisible] = createState(false);
  const [animate, _setAnimate] = createState(false);
  const [ignoreCallbacks, _setIgnoreCallbacks] = createState(false);

  return (
    <window
      name="power-menu"
      application={app}
      class="PowerMenu glass-container"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.ON_DEMAND}
      visible={visible}
      onShow={(self) => {
        self.grab_focus();
        _setAnimate(true);
        _setIgnoreCallbacks(true);
        setTimeout(() => {
          _setIgnoreCallbacks(false);
        }, 50);
      }}
      onHide={() => {
        _setAnimate(false);
      }}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, key) => {
          if (key === Gdk.KEY_Escape) {
            _setIgnoreCallbacks(true);
            cancel();
          }
        }}
      />
      <Gtk.EventControllerMotion
        onLeave={(_) => {
          if (ignoreCallbacks.get()) return;
          cancel();
        }}
      />
      <box valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
        <box class="power-menu-content" orientation={Gtk.Orientation.HORIZONTAL} spacing={16}>
          <button
            class={animate((val) => `power-button shutdown-button glass-container ${val ? "animate" : ""}`)}
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            onClicked={shutdown}
          >
            <label class="power-icon" label="" />
          </button>

          <button
            class={animate((val) => `power-button restart-button glass-container ${val ? "animate" : ""}`)}
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            onClicked={reboot}
          >
            <label class="power-icon" label="" />
          </button>

          <button
            class={animate((val) => `power-button cancel-button glass-container ${val ? "animate" : ""}`)}
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            onClicked={() => {
              _setIgnoreCallbacks(true);
              cancel();
            }}
          >
            <label class="power-icon" label="" />
          </button>
        </box>
      </box>
    </window>
  );
}