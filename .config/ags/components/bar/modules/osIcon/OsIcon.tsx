import app from "ags/gtk4/app"
import { Gdk } from "ags/gtk4"

function onClicked(): void {
  app.toggle_window("power-menu")
}

export default function OsIcon() {
  return (
    <button
      class="OsIcon transparentThenHoverFg"
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={onClicked}
    >
      <image
        file={"icons/arch.svg"}
      />
    </button>
  );
}