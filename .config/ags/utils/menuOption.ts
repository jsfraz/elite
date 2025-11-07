export class MenuOption {
  label: string | undefined;
  parentWindowName: string | undefined;
  action: (() => void) | undefined;
  isSeparator: boolean;
  submenu: Array<MenuOption> | undefined;

  constructor(
    {
      label = undefined,
      parentWindowName = undefined,
      action = undefined,
      isSeparator = false,
      submenu = undefined
    }: {
      label?: string | undefined;
      parentWindowName?: string | undefined;
      action?: (() => void) | undefined;
      isSeparator?: boolean;
      submenu?: Array<MenuOption> | undefined;
    } = {}
  ) {
    this.label = label;
    this.parentWindowName = parentWindowName;
    this.action = action;
    this.isSeparator = isSeparator;
    this.submenu = submenu;
  }

  // Get unique window name hash for submenu
  getHash(): string {
    let hash = 0;
    const str = this.label + (this.submenu ? '-submenu' : '');

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32-bit integer
    }

    // Convert to positive hex string
    return (hash >>> 0).toString(16);
  }
}