import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { timer, Subscription } from 'rxjs';

interface SpinnerState {
  requestCount: number;
  showTimer?: Subscription | null;
  hideTimer?: Subscription | null;
  shownAt?: number | null;
  pendingShow?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  // Time in ms before showing spinner (debounce to avoid flashing)
  private delayBeforeShow = 100;
  // Minimum time to keep spinner visible once shown
  private minShowTime = 0;

  private state: SpinnerState = {
    requestCount: 0,
    showTimer: null,
    hideTimer: null,
    shownAt: null,
    pendingShow: false,
  };

  constructor(private ngx: NgxSpinnerService) {}

  show() {
    this.state.requestCount++;

    // if already visible or pending show, nothing more to do
    if (this.state.shownAt) {
      return;
    }

    // if a showTimer already scheduled, keep it
    if (this.state.pendingShow) {
      return;
    }

    this.state.pendingShow = true;
    // schedule to show after delayBeforeShow
    this.state.showTimer = timer(this.delayBeforeShow).subscribe(() => {
      this.state.pendingShow = false;
      // check if requestCount still > 0
      if (this.state.requestCount > 0) {
        this.state.shownAt = Date.now();
        this.ngx.show(); // use named spinner
      }
      this.state.showTimer?.unsubscribe();
      this.state.showTimer = null;
    });
  }

  hide() {
    this.state.requestCount--;
    if (this.state.requestCount < 0) this.state.requestCount = 0;

    // if still pending show (not shown yet) and no more requests, cancel show
    if (this.state.pendingShow && this.state.requestCount === 0) {
      this.state.showTimer?.unsubscribe();
      this.state.showTimer = null;
      this.state.pendingShow = false;
      return;
    }

    // if not shown at all, nothing further
    if (!this.state.shownAt) {
      return;
    }

    const elapsed = Date.now() - (this.state.shownAt || 0);
    const remaining = Math.max(0, this.minShowTime - elapsed);

    // ensure spinner stays visible for minShowTime
    if (remaining > 0) {
      // schedule hide after remaining ms
      this.state.hideTimer?.unsubscribe();
      this.state.hideTimer = timer(remaining).subscribe(() => {
        this._doHide();
        this.state.hideTimer?.unsubscribe();
        this.state.hideTimer = null;
      });
    } else {
      this._doHide();
    }
  }

  private _doHide() {
    // only hide if no outstanding requests
    if (this.state.requestCount <= 0) {
      this.state.requestCount = 0;
      this.state.shownAt = null;
      this.ngx.hide();
    }
  }

  // helper: reset (useful in error flows)
  reset() {
    this.state.requestCount = 0;
    this.state.showTimer?.unsubscribe();
    this.state.hideTimer?.unsubscribe();
    this.state.showTimer = this.state.hideTimer = null;
    this.state.pendingShow = false;
    this.state.shownAt = null;
    this.ngx.hide();
  }
}
