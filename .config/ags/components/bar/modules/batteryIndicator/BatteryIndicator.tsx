import { Gtk } from "ags/gtk4";
import Battery from "gi://AstalBattery"
import { createBinding } from "gnim";

const battery = Battery.get_default()

export default function BatteryIndicator() {
    return (
        <button class="BatteryIndicator">
            <box
                orientation={Gtk.Orientation.VERTICAL}
                spacing={2}>
                {/* Battery cap */}
                <box class="battery-cap" />
                {/* Battery body */}
                <box
                    class="battery-body"
                    orientation={Gtk.Orientation.VERTICAL}
                >
                    <box
                        class={createBinding(battery, "charging")(c => c ? "battery-level charging" : "battery-level")}
                        vexpand={true}
                        valign={Gtk.Align.END}
                        css={createBinding(battery, "percentage",)((p) => `
                            min-height: ${p}%;
                        `)}
                    />
                </box>
            </box>
        </button>
    );
}