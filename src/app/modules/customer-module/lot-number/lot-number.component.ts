import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from '../../auth';
import { CustomerModel } from '../../auth/_models/customer.model';
import { GlobalService } from '../../auth/_services/GlobalService';

@Component({
  selector: 'app-lot-number',
  templateUrl: './lot-number.component.html',
  styleUrls: ['./lot-number.component.scss']
})
export class LotNumberComponent implements OnInit {

  defaultAuth = { lot_number: '' };
  lotNumberForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private globleService: GlobalService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/auth/customerlogin']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/customer/accountsummary';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.lotNumberForm.controls;
  }

  initForm() {
    this.lotNumberForm = this.fb.group({
      lot_number: [this.defaultAuth.lot_number, Validators.compose([Validators.required, Validators.maxLength(20),])]
    });
  }

  submit() {
    this.hasError = false;
     
    const loginSubscr = this.authService.customerLotCheck(this.f.lot_number.value).pipe(first())
      .subscribe((response: CustomerModel) => {
        console.log("customer response Lot Check", response);
        if (response) {
          this.router.navigate([this.returnUrl]);
          this.globleService.isAdminLoggedIn = false;
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
    // this.router.navigate([this.returnUrl]);
    // this.globleService.isAdminLoggedIn = false;
  }
  cancelLot() {
    this.router.navigate(['/auth/customerlogin']);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
