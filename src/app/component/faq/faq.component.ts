import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqService } from './faq.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  show = false;
  buttonName = '+';
  faqList: any;
  constructor(public faqService: FaqService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.faqService.getFaqList().subscribe((data: any) => {
      this.faqList = data;
      this.spinner.hide();
    });
  }
  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = '-';
      console.log(this.show);
    } else {
      this.buttonName = '+';
    }
  }
}
