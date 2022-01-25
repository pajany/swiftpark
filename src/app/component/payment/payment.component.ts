import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { homeService } from '../home-header/home-header.service';
import { PaymentService } from './payment.service';

declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  viewtransForm: FormGroup;

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
  transactionhistory: any = [];

  address: string = '';
  transactionemail: string = '';
  email: string = '';
  phone: number = 0;
  // date: number = Date.now();
  expiryDate: any = null;
  iscourtesycard: boolean = false;
  submitted: boolean;
  formProcess: boolean;
  token: string;
  isStripeCard: boolean = true;
  errorMessage: any = '';
  cardOptions: StripeCardElementOptions = {
    style: {
      complete: {},
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '20px',
        lineHeight: '40px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(
    public homeService: homeService,
    private spinner: NgxSpinnerService,
    public router: ActivatedRoute,
    public route: Router,
    public PaymentService: PaymentService,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {

    
    this.spinner.show();
    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
      this.homeService.lotNumberValidation(this.lotNumber).subscribe(
        (params: any) => {
          this.tableData = params.services;
          this.address=params.address;
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
          this.spinner.hide();
          this.route.navigate(['/home']);
          console.error(error);
        }
      );
    });
    this.cardTypeChange();

    this.viewtransForm = this.formBuilder.group({
      transactionemail: ['', Validators.required],
     
    });

  }

  createToken(): void {
    this.spinner.show();
    //  const name = this.stripeTest.get('name').value;
    this.stripeService.createToken(this.card.element).subscribe(result => {
      if (result.token) {
        // Use the token
        this.spinner.hide();
        this.token = result.token.id;
        this.paymentMethod();
        console.log(result.token.id);
      } else if (result.error) {
        // Error creating the token
        this.message = result.error.message;
        this.spinner.hide();
        this.showError(this.message);
        console.log(result.error.message);
      }
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
          if (data.name.includes('Night')) {
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
          if (data.type.includes('Days')) {
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

  transactionSubmit(){

    this.route.navigate(['/view-transaction'], { queryParams: { email: this.model.transactionemail } });
    $('#viewtransactionModal').modal('hide');
  }

  onSubmit() {
    if (this.isStripeCard && this.iscourtesycard) {
      this.paymentMethod();
    } else {
      this.createToken();
    }
  }

  paymentMethod() {
    let params: any = {};
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
      (params.email = this.model.email),
      (params.phone = this.model.phone),
      (params.totalamount = this.totalAmount),
      (params.expires_date = this.expiryDate),
      (params.license = this.model.license),
      (params.courtesy_number = this.model.courtesyCard),
      (params.pin = this.model.pin),
      (params.iscourtesycard = this.iscourtesycard);
    params.token = this.token;

    this.PaymentService.submitForm(params).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (!data.status) {
          setTimeout(() => {
            this.spinner.hide();
          }, 200);
          this.spinner.hide();
          this.route.navigate(['/success'], { queryParams: { permit: data.permit_no } });
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

  showError(message) {
    this.message = message;
    this.zone.run(() => {
      setTimeout(() => $('#exampleModal').modal('show'), 100);
    });
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

  changepin(lotNumber){
    this.route.navigate(['/change-pin', this.lotNumber]);
  }
}
