import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangepinValidator } from './change-pin.validator';


import { ChangepinFormService } from './change-pin.services';

declare var $: any;

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss']
})

export class ChangePinComponent implements OnInit {

  changepinForm!: FormGroup;
  submitted: boolean;
  mobnumPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  faxPattern = /^\+?[0-9]{6,}$/;
  city: any = [];
  isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  timeZoneList: any = [];
  lotNumber: number = 0;
  model: any = {};
  message: string = '';
  status: string = '';

  showModalBox: boolean = false;
  show: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public changepinService: ChangepinFormService,
    private spinner: NgxSpinnerService,
    public router: ActivatedRoute,
    public route: Router,
    private zone: NgZone,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    //this.spinner.show();
      
    this.changepinForm = this.formBuilder.group({
      cardNo: ['', Validators.required],
      currentPin: ['', Validators.required],
      newPin: ['', Validators.required],
      confirmpin: ['', Validators.required]
    },
    {
      validator: ChangepinValidator.MatchPin,
    }
    );

  }

  get f() {
    return this.changepinForm.controls;
  }

  onSubmit() {

    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
    });

    let params: any = {};
    (params.lot_number = this.lotNumber),
    (params.formdata = this.changepinForm.value),
   

    this.submitted = true;
    //this.spinner.show();
    if (!this.changepinForm.invalid) {
      this.changepinService.submitForm(params).subscribe(
        (data: any) => {
          console.log("Resssssssssss",data);

          this.message = data.message;
          this.status=data.status;
          this.spinner.hide();
         // this.route.navigate(['/home']);
          this.changepinForm.reset();
         
          $('#exampleModal').modal('show');
         // this.route.navigate(['/payment', this.lotNumber]);
          this.submitted = false;
          this.changepinForm.reset();
        },
        (error: any) => {
          console.error("Errorrrrrrr",error.error);
          this.message = error.error.message;
          this.status = error.error.status;
          
          this.spinner.hide();
          $('#exampleModal').modal('show')
         // this.showError(this.message);
        }
      );
    } else {
      this.spinner.hide();
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
