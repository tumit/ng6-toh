import { DebugElement } from '@angular/core';

export function textContent(el: DebugElement | HTMLElement | HTMLInputElement) {

  if (el instanceof HTMLElement) {
    return el.textContent;
  }

  if (el instanceof DebugElement) {
    return el.nativeElement.textContent;
  }

  return String(el);
}

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
 if (el instanceof HTMLElement) {
   el.click();
 } else {
   el.triggerEventHandler('click', eventObj);
 }
}
