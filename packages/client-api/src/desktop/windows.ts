import { getCurrentWindow } from '@tauri-apps/api/window';

import { desktopCommands } from './desktop-commands';

export type ZOrder = 'bottom_most' | 'top_most' | 'normal';

export interface WidgetWindow {
  /**
   * The underlying Tauri window.
   */
  readonly tauri: ReturnType<typeof getCurrentWindow>;

  /**
   * Sets the z-order of the Tauri window.
   */
  setZOrder(zOrder: ZOrder): Promise<void>;
}

/**
 * Gets the window of the current widget.
 */
export function currentWindow(): WidgetWindow {
  return {
    get tauri() {
      return getCurrentWindow();
    },
    setZOrder,
  };
}

/**
 * Sets (and unsets) the z-order flags of the window.
 */
async function setZOrder(zOrder: ZOrder) {
  if (zOrder === 'bottom_most') {
    await desktopCommands.setAlwaysOnTop(false);
    await desktopCommands.setAlwaysOnBottom(true);
  } else if (zOrder === 'top_most') {
    await desktopCommands.setAlwaysOnBottom(false);
    await desktopCommands.setAlwaysOnTop(true);
  } else {
    await desktopCommands.setAlwaysOnTop(false);
    await desktopCommands.setAlwaysOnBottom(false);
  }
}
