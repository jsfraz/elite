import { execAsync } from "ags/process";

interface NotifyOptions {
    summary: string;
    body: string;
    iconName: "dialog-information" | "dialog-warning" | "dialog-error" | "battery-low";
    urgency: "low" | "normal" | "critical";
}

// Send a desktop notification using notify-send
export function notify(options: NotifyOptions): void {
    execAsync([
        "notify-send",
        options.summary,
        options.body,
        "-i", options.iconName,
        "-u", options.urgency,
    ]).catch(console.error);
}
