import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from '../home-header/home-header.service';
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
  constructor(
    public homeService: homeService,
    private spinner: NgxSpinnerService,
    public router: ActivatedRoute,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
      this.homeService.lotNumberValidation(this.lotNumber).subscribe(
        (params: any) => {
          this.tableData = params.services;
          this.tableData.forEach(x => {
            x.quantity = '';
            x.selected = false;
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
    if (this.visibleDiv) {
      this.amount = Number(data.amt) * data.quantity;
      if (this.amount > 0) {
        this.totalAmount = this.amount + Number(this.taxAmount);
      } else {
        this.totalAmount = 0;
      }
    }
  }

  onCheckboxChange(event: any, data: any) {
    if (event.isTrusted) {
      this.visibleDiv = true;
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
    console.log('hi');
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
