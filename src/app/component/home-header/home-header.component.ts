import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from './home-header.service';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  lotNumber: any = undefined;
  constructor(public homeService: homeService, private spinner: NgxSpinnerService, public router: Router) {}
  ngOnInit() {}

  lotNumberValidation() {
    if (this.lotNumber !== undefined) {
      this.spinner.show();
      this.homeService.lotNumberValidation(this.lotNumber).subscribe(
        (data: any) => {
          if (data) {
            this.router.navigate(['/payment', this.lotNumber]);
            this.spinner.hide();
          }
        },
        error => {
          console.error(error);
          this.spinner.hide();
        }
      );
    }
  }

  handleKeydown(e: any) {
    const typedValue = e.keyCode;
    if (typedValue < 48 && typedValue > 57) {
      // If the value is not a number, we skip the min/max comparison
      return;
    }

    const typedNumber = parseInt(e.key);
    const min = parseInt(e.target.min);
    const max = parseInt(e.target.max);
    const currentVal = parseInt(e.target.value) || '';
    const newVal = parseInt(typedNumber.toString() + currentVal.toString());

    if (newVal < min || newVal > max) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
