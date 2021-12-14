import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './component/application-form/application-form.component';
import { CollegeUniversityComponent } from './component/college-university/college-university.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CourtesyCardComponent } from './component/courtesy-card/courtesy-card.component';
import { EventsPartyComponent } from './component/events-party/events-party.component';
import { FaqComponent } from './component/faq/faq.component';
import { FileADisputeComponent } from './component/file-a-dispute/file-a-dispute.component';
import { GenerateIncomeComponent } from './component/generate-income/generate-income.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import { HomeComponent } from './component/home/home.component';
import { HotelMotelComponent } from './component/hotel-motel/hotel-motel.component';
import { LearnMoreComponent } from './component/learn-more/learn-more.component';
import { PayLotComponent } from './component/pay-lot/pay-lot.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ResidentialAptComponent } from './component/residential-apt/residential-apt.component';
import { SignsComponent } from './component/signs/signs.component';
import { TermsComponent } from './component/terms/terms.component';
import { TruckComponent } from './component/truck/truck.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'residential-apt', component: ResidentialAptComponent },
  { path: 'hotel-motel', component: HotelMotelComponent},
  { path: 'college-university', component: CollegeUniversityComponent},
  { path: 'events-party', component: EventsPartyComponent},
  { path: 'pay-lot', component: PayLotComponent},
  { path: 'truck', component: TruckComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'learn-more', component: LearnMoreComponent},
  { path: 'generate-income', component: GenerateIncomeComponent},
  { path: 'get-started', component: GetStartedComponent},
  { path: 'application-form', component: ApplicationFormComponent},
  { path: 'signs', component: SignsComponent},
  { path: 'courtesy-card', component: CourtesyCardComponent},
  { path: 'file-a-dispute', component: FileADisputeComponent},
  { path: 'payment', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
