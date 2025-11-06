import { Gdk } from "ags/gtk4";
import { interval } from "ags/time";
import GTop from "gi://GTop";
import { createState } from "gnim";

GTop.glibtop_init();
const RUN_FRAMES = 5;
const [prevCpuStats, _setPrevCpuStats] = createState({ active: 0, total: 0 });
const [cpuUsage, _setCpuUsage] = createState(0);
const [iconPath, _setIconPath] = createState(`icons/runcat/idle/sprite-0-symbolic.svg`);
const [frameIndex, _setFrameIndex] = createState(0);

// CPU usage calculation based on GTop
function getCpuUsage(): number {
  try {
    const cpu = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(cpu);

    const currentStats = {
      active: cpu.user + cpu.sys + cpu.nice,
      total: cpu.total,
    };

    const prev = prevCpuStats.get();
    const activeDiff = currentStats.active - prev.active;
    const totalDiff = currentStats.total - prev.total;

    _setPrevCpuStats(currentStats);

    if (totalDiff === 0) return 0;

    return Math.round((activeDiff / totalDiff) * 100);
  } catch (e) {
    console.error("Error getting CPU usage:", e);
    return 0;
  }
}

function getIconPath(cpuUsage: number): string {
  // Idle
  if (cpuUsage <= 5) {
    return `icons/runcat/idle/sprite-0-symbolic.svg`;
  }

  // Animation
  // TODO speed
  const currentFrame = frameIndex.get() % RUN_FRAMES;
  _setFrameIndex(frameIndex.get() + 1);

  return `icons/runcat/active/sprite-${currentFrame}-symbolic.svg`;
};

interval(500, () => {
  const usage = getCpuUsage();
  _setCpuUsage(usage);
  const path = getIconPath(usage);
  _setIconPath(path);
})

export default function RunCat() {
  return (
    <button
      class="RunCat transparentThenHoverFg"
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      tooltipText={cpuUsage((usage) => `${usage}%`)}
    >
      <image
        file={iconPath((path) => { return path; })}
      />
    </button>
  );
}