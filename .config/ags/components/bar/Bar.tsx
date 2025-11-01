import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import OsIcon from "./modules/osIcon/OsIcon"
import Clock from "./modules/clock/Clock"
import BatteryIndicator from "./modules/batteryIndicator/BatteryIndicator"

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
          spacing={4}
          homogeneous={false}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <OsIcon />
        </box>
        <box
          $type="end"
          spacing={4}
          homogeneous={false}
          orientation={Gtk.Orientation.VERTICAL}
          class={"bottomPadding"}
        >
          <BatteryIndicator />
          <Gtk.Separator class="short-separator" />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
