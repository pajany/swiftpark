import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AplicationFormService } from './aplication-form.service';
declare var $: any;
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  
  registerForm!: FormGroup;
  submitted = false;
  mobnumPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  faxPattern = /^\+?[0-9]{6,}$/;
  city: any = [];
  isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  timeZoneList: any = [];
  showModalBox: boolean = false;
  message: any = null;
  show: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public appService: AplicationFormService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.appService.getProvince().subscribe((data: any) => {
      this.city = data;
      this.spinner.hide();
    });
    this.appService.getTimeZone().subscribe((data: any) => {
      this.timeZoneList = data;
      this.spinner.hide();
    });
    this.registerForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      companyName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: null,
      phoneNumber: ['', [Validators.pattern(this.mobnumPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      faxNumber: ['', [Validators.required, Validators.pattern(this.faxPattern)]],
      email: ['', [Validators.required, Validators.email]],
      cityName: ['', Validators.required],
      province: ['', Validators.required],
      postCode: ['', [Validators.required, Validators.pattern(this.isValidZip)]],
      timeZone: ['', Validators.required]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (!this.registerForm.invalid) {
      this.appService.submitForm(this.registerForm.value).subscribe(
        (data: any) => {
          this.message = data.message;
          this.spinner.hide();
          this.registerForm.reset();
          $('#exampleModal').modal('show');
          this.submitted = false;
          this.registerForm.reset();
        },
        error => {
          console.error(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }
}
