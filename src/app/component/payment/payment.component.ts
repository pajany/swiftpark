import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from '../home-header/home-header.service';
import { PaymentService } from './payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  inputnumber = 0;
  visibleDiv: boolean = false;
  lotNumber: number = 0;
  tableData: any[] = [];
  amount: number | undefined = 0;
  taxAmount: number = 0;
  totalAmount: number | undefined = 0;
  model: any = {};
  // date: number = Date.now();
  expiryDate: any = null;

  constructor(
    public homeService: homeService,
    private spinner: NgxSpinnerService,
    public router: ActivatedRoute,
    public route: Router,
    public PaymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
      this.homeService.lotNumberValidation(this.lotNumber).subscribe(
        (params: any) => {
          params = {
            lotno: '12123',
            services: [
              {
                name: '24hrs',
                amt: '0.50',
                description: '24hrs',
                type: 'hours',
                duration: '24',
                expires: ''
              },
              {
                name: 'Hours',
                amt: '0.50',
                description: 'Hours',
                type: 'hours',
                duration: '1',
                expires: ''
              },
              {
                name: '30 Days Pass',
                amt: '0.50',
                description: '30 Days Pass',
                type: 'days',
                duration: '30',
                expires: ''
              },
              {
                name: 'All Day',
                amt: '0.50',
                description: 'All Day',
                expires: '14',
                type: 'hours',
                duration: '1'
              },
              {
                name: 'OverNight',
                amt: '0.50',
                description: 'OverNight',
                expires: '4',
                type: 'hours',
                duration: '1'
              }
            ],
            tax: '13'
          };
          this.tableData = params.services;
          this.tableData.forEach(x => {
            x.quantity = '';
            x.selected = false;
            if (x.name == '30 Days Pass') {
              x.quantity = 1;
            }
          });
          this.taxAmount = params.tax;
          this.spinner.hide();
          // this.route.navigate(['/home']);
        },
        error => {
          this.route.navigate(['/home']);
          this.spinner.hide();
          console.error(error);
        }
      );
    });
  }
  plus(item: any) {
    item.quantity++;
    this.amountCalculation(item);
  }
  minus(item: any) {
    item.quantity = item.quantity || 0;
    if (item.quantity != 0) {
      item.quantity--;
      this.amountCalculation(item);
    }
  }
  amountCalculation(data: any) {
    if (this.visibleDiv && data.selected) {
      this.amount = Number(data.amt) * data.quantity;
      if (this.amount > 0) {
        this.totalAmount = this.amount + Number(this.taxAmount);
        this.expiryDate = new Date();
        if (data.expires) {
          if (data.name === 'OverNight') {
            this.expiryDate.setDate(this.expiryDate.getDate() + Number(data.duration) * Number(data.quantity));
          } else {
            let numbeOfDate = Number(data.duration) * Number(data.quantity);
            this.expiryDate.setDate(this.expiryDate.getDate() + numbeOfDate - 1);
          }
          let hours: number = Number(data.expires);
          this.expiryDate.setHours(hours);
          this.expiryDate.setMinutes(0);
          this.expiryDate.setSeconds(0);
        } else {
          if (data.type === 'days') {
            this.expiryDate.setDate(this.expiryDate.getDate() + Number(data.duration) * Number(data.quantity));
          } else {
            let hours = Number(data.duration) * Number(data.quantity);
            this.expiryDate.setHours(this.expiryDate.getHours() + hours);
          }
        }
      } else {
        this.totalAmount = 0;
      }
    }
  }

  onCheckboxChange(event: any, data: any) {
    if (event.isTrusted) {
      this.visibleDiv = true;
      this.tableData.forEach(x => {
        x.selected = false;
        x.quantity = '';
      });
      data.selected = true;
      data.quantity = data.quantity;
      this.amountCalculation(data);
    }
  }

  onRadioChange(index: any) {
    switch (index) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
  }

  onSubmit() {
    let params: any = {};
    this.tableData.forEach(x => {
      if (x.selected) {
        params.name = x.name;
        params.selectedAmount = x.amt;
      }
    });
    params.amount = this.amount;
    params.taxAmount = this.taxAmount;
    params.totalAmount = this.totalAmount;
    params.expiryDate = this.expiryDate;
    params.license = this.model.license;
    params.pin = this.model.pin;
    this.PaymentService.submitForm(params).subscribe((data: any) => {});
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
