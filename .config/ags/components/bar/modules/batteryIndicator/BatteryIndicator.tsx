import { Gdk } from "ags/gtk4";
import Battery from "gi://AstalBattery";
import { createBinding } from "gnim";
import { notify } from "../../../../utils/dialog";

const battery = Battery.get_default();
// Watch for low battery and send notification
let hasShownLowBatteryWarning = false;
let hasShownFullyChargedNotification = false;

battery.connect("notify::percentage", () => {
    const percentage = battery.percentage * 100;
    
    if (percentage <= 15 && !battery.charging && !hasShownLowBatteryWarning) {
        notify({
            summary: "Low Battery",
            body: `Battery level is at ${Math.round(percentage)}%`,
            iconName: "battery-low",
            urgency: "critical"
        });
        hasShownLowBatteryWarning = true;
    }
    
    // Reset flag if battery is above 20%
    if (percentage > 20) {
        hasShownLowBatteryWarning = false;
    }

    // Notify when fully charged
    if (percentage >= 100 && battery.charging && !hasShownFullyChargedNotification) {
        notify({
            summary: "Battery Fully Charged",
            body: "Battery is at 100%",
            iconName: "battery-full-charged",
            urgency: "normal"
        });
        hasShownFullyChargedNotification = true;
    }

    // Reset flag when battery drops below 100% or stops charging
    if (percentage < 100 || !battery.charging) {
        hasShownFullyChargedNotification = false;
    }
});

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
                // "No overload matches this call" error for some reason
                // @ts-ignore
                iconName={createBinding(battery, "battery-icon-name")}
            />
        </button>
    );
}