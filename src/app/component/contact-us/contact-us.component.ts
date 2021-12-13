import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  mobnumPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  constructor(private formBuilder: FormBuilder) {}
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  faxPattern = /^\+?[0-9]{6,}$/;
  city: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  ngOnInit() {
    //   this.registerForm = this.formBuilder.group({
    //     clientName: ['', Validators.required],
    //     companyName: ['', Validators.required],
    //     address1: ['', Validators.required],
    //     address2: null,
    //     phoneNumber: [null, [Validators.pattern(this.mobnumPattern)]],
    //     mobileNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
    //     faxNumber: ['', [Validators.required, Validators.pattern(this.faxPattern)]],
    //     email: ['', [Validators.required, Validators.email]],
    //     cityName: ['', Validators.required],
    //     province: ['', Validators.required],
    //     postCode: ['', [Validators.required, Validators.pattern(this.isValidZip)]],
    //     timeZone: ['', Validators.required]
    //   });
    // }
    // // convenience getter for easy access to form fields
    // get f() {
    //   return this.registerForm.controls;
    // }
    // onSubmit() {
    //   this.submitted = true;
    //   // stop here if form is invalid
    //   if (this.registerForm.invalid) {
    //     return;
    //   }
    //   // display form values on success
    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}
