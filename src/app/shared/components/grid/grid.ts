import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  template: `
    <img src="assets/images/grid-01.svg" alt="grid" class="grid grid-top" />
    <img src="assets/images/grid-01.svg" alt="grid" class="grid grid-bottom" />
  `,
  styles: `.grid {
      position: absolute;
      max-width: 50%;
      z-index: 0;
    }
    .grid-top {
      top: 0;
      inset-inline-end: 0;
      transform: scaleX(1);
    }
    .grid-bottom {
      bottom: 0;
      inset-inline-start: 0;
      transform: rotate(180deg);
    }
    :host-context([dir="rtl"]) .grid-top {
      transform: scaleX(-1);
    }
    :host-context([dir="rtl"]) .grid-bottom {
      transform: rotate(180deg) scaleX(-1);
    }
  `,
})
export class Grid {}
