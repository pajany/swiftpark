import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from './home-header.service';

declare var $: any;
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  lotNumber: number;
  HighlightRow: Number;
  ClickedRow: any;
  constructor(public homeService: homeService, private spinner: NgxSpinnerService, public router: Router,
    public route: ActivatedRoute) {
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }
  message: any;
  show: boolean = false;
  submitted: boolean = false;
  hearderList: any[] = [];
  ngOnInit() {
    this.spinner.show();
    this.hearderList = [];
    this.homeService.getDynamicPage().subscribe((page: any) => {
      this.spinner.hide();
      page.forEach(x => {
        if (x.header_menu) {
          this.hearderList.push(x);
        }
      });
    });
  }

  lotNumberValidation() {
    this.submitted = true;
    if (this.lotNumber) {
      this.submitted = false;
      this.spinner.show();
      this.homeService.lotNumberValidation(this.lotNumber).subscribe(
        (data: any) => {
          if (!data.status) {
            this.router.navigate(['/payment', this.lotNumber]);
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error: any) => {
          console.error(error);
          this.message = error.error.message;
          this.spinner.hide();
          $('#exampleModal').modal('show');
          this.spinner.hide();
        }
      );
    }
  }

  navigate(path) {
    this.router.navigate(['/pages', path]);
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
