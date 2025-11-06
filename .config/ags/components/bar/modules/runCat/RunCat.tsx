import { Gdk } from "ags/gtk4";
import { interval } from "ags/time";
import GTop from "gi://GTop";
import { createState } from "gnim";

GTop.glibtop_init();
const RUN_FRAMES = 5;
const MIN_ANIMATION_INTERVAL = 10;  // Fastest animation 100% CPU
const MAX_ANIMATION_INTERVAL = 250; // Slowest animation 0% CPU
const [prevCpuStats, _setPrevCpuStats] = createState({ active: 0, total: 0 });
const [cpuUsage, _setCpuUsage] = createState(0);
const [iconPath, _setIconPath] = createState(`icons/runcat/idle/sprite-0-symbolic.svg`);
const [frameIndex, _setFrameIndex] = createState(0);
const [animationInterval, _setAnimationInterval] = createState(MAX_ANIMATION_INTERVAL);

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
  const currentFrame = frameIndex.get() % RUN_FRAMES;
  _setFrameIndex(frameIndex.get() + 1);

  return `icons/runcat/active/sprite-${currentFrame}-symbolic.svg`;
}

function calculateAnimationSpeed(cpuUsage: number): number {
  // Linear interpolation between MIN and MAX intervals
  // 0% CPU = MAX, 100% CPU = MIN
  return MAX_ANIMATION_INTERVAL - ((cpuUsage / 100) * (MAX_ANIMATION_INTERVAL - MIN_ANIMATION_INTERVAL));
}

// Check CPU usage every second
interval(1000, () => {
  const usage = getCpuUsage();
  _setCpuUsage(usage);

  // Update animation speed based on CPU
  const newInterval = calculateAnimationSpeed(usage);
  _setAnimationInterval(newInterval);
});

// Animation runs with dynamic interval
let lastUpdate = Date.now();
interval(50, () => {
  const now = Date.now();
  const targetInterval = animationInterval.get();

  if (now - lastUpdate >= targetInterval) {
    const usage = cpuUsage.get();
    const path = getIconPath(usage);
    _setIconPath(path);
    lastUpdate = now;
  }
});

export default function RunCat() {
  return (
    <button
      class="RunCat transparentThenHoverFg"
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      tooltipText={cpuUsage((usage) => `${usage}%`)}
    >
      <image
        file={iconPath((path) => path)}
      />
    </button>
  );
}