import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  message: string = '';
  show: boolean = false;
  // date: number = Date.now();
  expiryDate: any = null;
  iscourtesycard: boolean = false;
  submitted: boolean;
  formProcess: boolean;
  customStripeForm: FormGroup;
  token: string;
  isStripeCard: boolean = true;
  errorMessage: any = '';
  constructor(
    public homeService: homeService,
    private spinner: NgxSpinnerService,
    public router: ActivatedRoute,
    public route: Router,
    public PaymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadStripe();
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
    this.customStripeForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.cardTypeChange();
  }
  get g() {
    return this.customStripeForm.controls;
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-custom-form-script';
      s.type = 'text/javascript';
      s.src = 'https://js.stripe.com/v2/';
      window.document.body.appendChild(s);
    }
  }

  pay(form) {
    if (!this.iscourtesycard) {
      this.spinner.show();
      if (!window['Stripe']) {
        alert('Oops! Stripe did not initialize properly.');
        return;
      }
      this.submitted = true;
      console.log(this.customStripeForm);
      if (this.customStripeForm.invalid) {
        this.spinner.hide();
        return;
      }
      this.formProcess = true;
      console.log('form');
      console.log(form);
      if (!window['Stripe']) {
        this.spinner.hide();
        alert('Oops! Stripe did not initialize properly.');
        return;
      }
      (<any>window).Stripe.card.createToken(
        {
          number: form.cardNumber,
          exp_month: form.expMonth,
          exp_year: form.expYear,
          cvc: 123
        },
        (status: number, response: any) => {
          this.submitted = false;
          this.formProcess = false;
          if (status === 200) {
            this.spinner.hide();
            this.token = response.id;
            this.isStripeCard = true;
            this.onSubmit();
          } else {
            debugger;
            console.log(this.message);
            this.errorMessage = response.error.message;
            this.spinner.hide();
            this.isStripeCard = false;
            setTimeout(() => {
              this.showError(response.error.message);
            }, 1);
          }
        }
      );
    }
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
    let params: any = {};
    if (this.isStripeCard) {
      this.spinner.show();
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
      params.token = this.token;

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
          this.showError(this.message);
        }
      );
    }
  }

  showError(message) {
    this.message = message;
    $('#exampleModal').modal('show');
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
    if (this.iscourtesycard) {
      this.isStripeCard = true;
      this.customStripeForm.get('cardNumber').setValidators(null);
      this.customStripeForm.get('expMonth').setValidators(null);
      this.customStripeForm.get('expYear').setValidators(null);
      this.customStripeForm.get('cvv').setValidators(null);
    } else {
      this.isStripeCard = false;
      this.customStripeForm.get('cardNumber').setValidators([Validators.required]);
      this.customStripeForm.get('expMonth').setValidators([Validators.required]);
      this.customStripeForm.get('expYear').setValidators([Validators.required]);
      this.customStripeForm.get('cvv').setValidators([Validators.required]);
    }
  }
}
