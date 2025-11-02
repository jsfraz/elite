import { createState } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";

function shutdown() {
  execAsync(["systemctl", "poweroff"]);
}

function reboot() {
  execAsync(["systemctl", "reboot"]);
}

function cancel() {
  app.toggle_window("power-menu")
}

export default function PowerMenu(gdkmonitor: Gdk.Monitor) {
    const [visible, _setVisible] = createState(false);
  
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
    >
      <box valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>      
          <box class="power-menu-content" orientation={Gtk.Orientation.HORIZONTAL} spacing={16}>
            <button
              class="power-button shutdown-button glass-container"
              cursor={Gdk.Cursor.new_from_name("pointer", null)}
              onClicked={shutdown}
            >
              <label class="power-icon" label="" />
            </button>
            
            <button
              class="power-button restart-button glass-container"
              cursor={Gdk.Cursor.new_from_name("pointer", null)}
              onClicked={reboot}
            >
              <label class="power-icon" label="" />
            </button>
            
            <button
              class="power-button cancel-button glass-container"
              cursor={Gdk.Cursor.new_from_name("pointer", null)}
              onClicked={cancel}
            >
              <label class="power-icon" label="" />
            </button>
          </box>
        </box>
    </window>
  );
}