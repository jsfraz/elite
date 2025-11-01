import { Gdk, Gtk } from "ags/gtk4"
import { With } from "gnim";
import { currentTimeString, getCurrentDateString } from "../../../../utils/time";

// https://github.com/Youwes09/Ateon/blob/f07f4e6dea111afa8174a92a6035a691cd88d3c3/ags/utils/time.ts

// Single digit stack
function DigitStack(index: number) {
    return (
        <stack
            class="digit-stack"
            transitionDuration={250}
            transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
            $={(self) => (
                <With value={currentTimeString}>
                    {(time) => {
                        const str = time ?? "00:00";
                        self.visibleChildName = str[index] ?? "0";
                        return null;
                    }}
                </With>
            )}
        >
            {Array.from({ length: 10 }, (_, i) => (
                <label
                    $type="named"
                    name={i.toString()}
                    label={i.toString()}
                    halign={Gtk.Align.CENTER}
                />
            ))}
        </stack>
    );
}

// Time display (HH:MM)
function TimeDisplay() {
    return (
        <box
            orientation={Gtk.Orientation.VERTICAL}
            halign={Gtk.Align.CENTER}
        >
            <box halign={Gtk.Align.CENTER}>
                {DigitStack(0)}
                {DigitStack(1)}
            </box>
            <box halign={Gtk.Align.CENTER}>
                {DigitStack(3)}
                {DigitStack(4)}
            </box>
        </box>
    );
}

export default function Clock() {
    return (
        <button
            class="Clock transparentThenHoverFg"
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            tooltipText={getCurrentDateString()}
        >
            <TimeDisplay />
        </button>
    );
}