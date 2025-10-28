import { Astal, Gtk, Gdk } from "ags/gtk4"

export default function OsIcon() {
  return (
    <button class="OsIcon" cursor={Gdk.Cursor.new_from_name("pointer", null)}>
      <image
        file={"icons/arch.svg"}
      />
    </button>
  );
}