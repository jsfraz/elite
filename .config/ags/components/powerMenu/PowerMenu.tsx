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
      <box
      valign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={10}>
        <button
          class="power-button"
          cursor={Gdk.Cursor.new_from_name("pointer", null)}
          onClicked={shutdown}
        >
          <label label="⏻ Power off" />
        </button>
        
        <button
          class="power-button"
          cursor={Gdk.Cursor.new_from_name("pointer", null)}
          onClicked={reboot}
        >
          <label label=" Restart" />
        </button>
        
        <button
          class="power-button"
          cursor={Gdk.Cursor.new_from_name("pointer", null)}
          onClicked={cancel}
        >
          <label label="Cancel" />
        </button>
      </box>
    </window>
  );
}