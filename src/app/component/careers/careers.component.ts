import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AplicationFormService } from '../application-form/aplication-form.service';

declare var $: any;
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  mobnumPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,14}$';
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['',  [Validators.pattern(this.mobnumPattern)]],
      email: ['', [Validators.required, Validators.email]],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (!this.registerForm.invalid) {
      const formData = new FormData();
      formData.append('firstname', this.registerForm.get('firstName').value);
      formData.append('lastname', this.registerForm.get('lastName').value);
      formData.append('emailid', this.registerForm.get('email').value);
      formData.append('phonenumber', this.registerForm.get('phoneNumber').value);
      formData.append('file', this.registerForm.get('fileSource').value);

      this.appService.submitCareersForm(formData).subscribe(
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        fileSource: file        
      });     
    }
  }
}
