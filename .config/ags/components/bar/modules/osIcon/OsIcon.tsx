import { Gdk, Gtk } from "ags/gtk4"

// Icon click
function onClicked(source: Gtk.Button): void {

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