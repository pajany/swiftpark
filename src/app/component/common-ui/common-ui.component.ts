import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-common-ui',
  templateUrl: './common-ui.component.html',
  styleUrls: ['./common-ui.component.scss']
})
export class CommonUiComponent implements OnInit {
  constructor(public spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  show() {
    this.spinner.show();
  }
  hide() {
    this.spinner.hide();
  }
}
