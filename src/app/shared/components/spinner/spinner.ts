import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner-service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  imports: [NgxSpinnerModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
@Input() bdColor: string = 'rgba(0, 0, 0, 0.6)';
@Input() size: 'small' | 'medium' | 'large' = 'medium';
@Input() color: string = '#fff';
@Input() type: string = 'pacman';

constructor(public spinnerService: SpinnerService) {}

ngOnDestroy() { this.spinnerService.reset(); }
show() { this.spinnerService.show(); }
hide() { this.spinnerService.hide(); }
}
