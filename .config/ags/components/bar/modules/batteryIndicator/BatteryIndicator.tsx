import { Gdk } from "ags/gtk4";
import Battery from "gi://AstalBattery";
import { createBinding } from "gnim";

const battery = Battery.get_default();

export default function BatteryIndicator() {
    return (
        <button
            class="BatteryIndicator transparentThenHoverFg"
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            tooltipText={createBinding(battery, "percentage")((p) =>
                `${Math.round(p * 100)}%`
            )}
        >
            <image
                iconName={createBinding(battery as any, "battery-icon-name")}
            />
        </button>
    );
}