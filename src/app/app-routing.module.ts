import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './component/application-form/application-form.component';
import { CareersComponent } from './component/careers/careers.component';
import { ChangePinComponent } from './component/change-pin/change-pin.component';
import { CollegeUniversityComponent } from './component/college-university/college-university.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CourtesyCardComponent } from './component/courtesy-card/courtesy-card.component';
import { DynamicPageComponent } from './component/dynamic-page/dynamic-page.component';
import { EventsPartyComponent } from './component/events-party/events-party.component';
import { FaqComponent } from './component/faq/faq.component';
import { FileADisputeComponent } from './component/file-a-dispute/file-a-dispute.component';
import { GenerateIncomeComponent } from './component/generate-income/generate-income.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import { HomeComponent } from './component/home/home.component';
import { HotelMotelComponent } from './component/hotel-motel/hotel-motel.component';
import { LearnMoreComponent } from './component/learn-more/learn-more.component';
import { NemesisComponent } from './component/nemesis/nemesis.component';
import { PayLotComponent } from './component/pay-lot/pay-lot.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ResidentialAptComponent } from './component/residential-apt/residential-apt.component';
import { SignsComponent } from './component/signs/signs.component';
import { SuccessPageComponent } from './component/success-page/success-page.component';
import { SuccessdisputeComponent } from './component/successdispute/successdispute.component';
import { TermsComponent } from './component/terms/terms.component';
import { TruckComponent } from './component/truck/truck.component';
import { ViewTransactionComponent } from './component/view-transaction/view-transaction.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'view-transaction', component: ViewTransactionComponent },
  { path: 'change-pin/:lotNumber', component: ChangePinComponent },
  { path: 'residential-apt', component: ResidentialAptComponent },
  { path: 'hotel-motel', component: HotelMotelComponent },
  { path: 'college-university', component: CollegeUniversityComponent },
  { path: 'events-party', component: EventsPartyComponent },
  { path: 'pay-lot', component: PayLotComponent },
  { path: 'truck', component: TruckComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: 'generate-income', component: GenerateIncomeComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'application-form', component: ApplicationFormComponent },
  { path: 'signs', component: SignsComponent },
  { path: 'courtesy-card', component: CourtesyCardComponent },
  { path: 'file-a-dispute', component: FileADisputeComponent },
  { path: 'payment/:lotNumber', component: PaymentComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'success-dispute', component: SuccessdisputeComponent },
  { path: 'pages/:header', component: DynamicPageComponent },
  { path: 'nemesis', component: NemesisComponent },
  { path: 'careers', component: CareersComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
