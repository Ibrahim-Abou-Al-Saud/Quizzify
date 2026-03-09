import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { fromEvent } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, MatIcon, MatTooltip, MatButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements AfterViewInit {
  showScrollBtn = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    fromEvent(window, 'scroll').subscribe(() => {
      const top = window.scrollY || document.documentElement.scrollTop;
      const shouldShow = top > 500;
      if (this.showScrollBtn !== shouldShow) {
        this.showScrollBtn = shouldShow;
        this.cdr.detectChanges();
      }
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
