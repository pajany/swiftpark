import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxStripeModule } from 'ngx-stripe';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationFormComponent } from './component/application-form/application-form.component';
import { CollegeUniversityComponent } from './component/college-university/college-university.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CourtesyCardComponent } from './component/courtesy-card/courtesy-card.component';
import { DynamicPageComponent } from './component/dynamic-page/dynamic-page.component';
import { EventsPartyComponent } from './component/events-party/events-party.component';
import { FaqComponent } from './component/faq/faq.component';
import { FileADisputeComponent } from './component/file-a-dispute/file-a-dispute.component';
import { FooterComponent } from './component/footer/footer.component';
import { GenerateIncomeComponent } from './component/generate-income/generate-income.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeHeaderComponent } from './component/home-header/home-header.component';
import { HomeComponent } from './component/home/home.component';
import { HotelMotelComponent } from './component/hotel-motel/hotel-motel.component';
import { LearnMoreComponent } from './component/learn-more/learn-more.component';
import { PayLotComponent } from './component/pay-lot/pay-lot.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ResidentialAptComponent } from './component/residential-apt/residential-apt.component';
import { RevenueCalculatorComponent } from './component/revenue-calculator/revenue-calculator.component';
import { SignsComponent } from './component/signs/signs.component';
import { SuccessPageComponent } from './component/success-page/success-page.component';
import { TermsComponent } from './component/terms/terms.component';
import { TruckComponent } from './component/truck/truck.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CommonUiComponent } from './component/common-ui/common-ui.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    WelcomeComponent,
    HomeHeaderComponent,
    ResidentialAptComponent,
    HotelMotelComponent,
    CollegeUniversityComponent,
    EventsPartyComponent,
    PayLotComponent,
    TruckComponent,
    FaqComponent,
    ContactUsComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    LearnMoreComponent,
    GenerateIncomeComponent,
    GetStartedComponent,
    ApplicationFormComponent,
    SignsComponent,
    CourtesyCardComponent,
    FileADisputeComponent,
    PaymentComponent,
    RevenueCalculatorComponent,
    SuccessPageComponent,
    DynamicPageComponent,
    CommonUiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    InputNumberModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    MatDialogModule,
    OverlayModule,
    MatIconModule,
    NgxStripeModule.forRoot(
      'pk_test_51K9nZHHBnGyCwdA0P3mVjhcQuRp9wJCv0XKGjxZPYxFelJJlxGuOJ23HAggDdgiLnwIjn6btN8ZfTnkFxL7nCKkL00ErdMPkzV'
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
