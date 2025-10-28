import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import OsIcon from "./modules/osIcon/OsIcon"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      margin={0}
      application={app}
      layer={Astal.Layer.OVERLAY}
    >
      <centerbox
        cssName="centerbox"
        orientation={Gtk.Orientation.VERTICAL}
        class="glass-container"
      >
        <box
          $type="start"
          spacing={12}
          homogeneous={false}
          orientation={Gtk.Orientation.VERTICAL}
          class={"box"}
        >
          <OsIcon />
        </box>
      </centerbox>
    </window>
  )
}
