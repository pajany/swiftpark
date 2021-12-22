import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from '../home-header/home-header.service';
import { PaymentService } from './payment.service';
declare var $: any;
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
  amount: number = 0;
  taxAmount: number = 0;
  totalAmount: number | undefined = 0;
  model: any = {};
  message: any;
  show: boolean = false;
  // date: number = Date.now();
  expiryDate: any = null;
  iscourtesycard: boolean = true;

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
          this.tableData = params.services;
          this.tableData.forEach(x => {
            x.selected = false;
            if (x.duration === 30) {
              x.quantity = 1;
            } else {
              x.quantity = '';
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
        console.log(this.expiryDate);
      } else {
        this.totalAmount = 0;
      }
    }
  }

  onCheckboxChange(event: any, data: any, quantity: number) {
    if (event.isTrusted) {
      this.visibleDiv = true;
      this.tableData.forEach(x => {
        x.selected = false;
        x.quantity = '';
      });
      if (data.duration === 30) {
        data.quantity = 1;
      } else {
        data.quantity = quantity;
      }
      data.selected = true;

      this.amountCalculation(data);
    }
  }

  onRadioChange(index: any) {
    this.cardTypeChange();
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
    this.spinner.show();
    let params: any = {};
    this.tableData.forEach(x => {
      if (x.selected) {
        params.permit_type = x.name;
        params.quantity = x.quantity;
        params.selectedAmount = x.amt;
      }
    });

    (params.lot_number = this.lotNumber),
      (params.subtotal = this.amount),
      (params.taxamount = this.taxAmount),
      (params.totalamount = this.totalAmount),
      (params.expires_date = this.expiryDate),
      (params.license = this.model.license),
      (params.courtesy_number = this.model.courtesyCard),
      (params.pin = this.model.pin),
      (params.iscourtesycard = this.iscourtesycard);

    this.PaymentService.submitForm(params).subscribe(
      (data: any) => {
        if (!data.status) {
          this.route.navigate(['/success'], { queryParams: { permit: data.permit_no } });
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
      }
    );
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
  cardTypeChange() {
    this.iscourtesycard = !this.iscourtesycard;
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }

  createPayment() {
    this.PaymentService.createPayment('test').subscribe(resp => {
      let sessionId = resp.sessionId;
      const stripe = Stripe(
        'pk_test_51K8pFqSJaFwnlJbfbY3CZt5vWtrKzCnQ8qYTA1BXRFXNaIcZth3gguPFnz0BzUZIJoKePFjNY6516p3jIc7s9gQl00nvAZgP0q'
      );
      stripe
        .redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: sessionId
        })
        .then(function (result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
    });
  }
}
