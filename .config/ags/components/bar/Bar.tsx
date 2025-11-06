import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import OsIcon from "./modules/osIcon/OsIcon"
import Clock from "./modules/clock/Clock"
import BatteryIndicator from "./modules/batteryIndicator/BatteryIndicator"
import RunCat from "./modules/runCat/RunCat"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="bar"
      application={app}
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      layer={Astal.Layer.OVERLAY}
      visible
    >
      <centerbox
        cssName="centerbox"
        orientation={Gtk.Orientation.VERTICAL}
        class="glass-container"
      >
        <box
          $type="start"
          spacing={2}
          homogeneous={false}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <OsIcon />
        </box>
        <box
          $type="end"
          spacing={2}
          homogeneous={false}
          orientation={Gtk.Orientation.VERTICAL}
          class={"bottomPadding"}
        >
          <RunCat />
          <Gtk.Separator class="short-separator" />
          <BatteryIndicator />
          <Gtk.Separator class="short-separator" />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
