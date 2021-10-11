import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ECommerceComponent } from './e-commerce.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CourtesyCardComponent } from './courtesy-card/courtesy-card.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';  
import { ViewPermitsComponent } from './view-permits/view-permits.component'; 
import { IncomeReportComponent } from './income-report/income-report.component';
import { TaxReportComponent } from './tax-report/tax-report.component';

const routes: Routes = [
  {
    path: '',
    component: ECommerceComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'courtesycard',
        component: CourtesyCardComponent,
      },
      {
        path: 'lotdetails',
        component: LotDetailsComponent,
      },
      {
        path: 'accountsummary',
        component: AccountSummaryComponent,
      },
      {
        path: 'viewpermit',
        component: ViewPermitsComponent,
      },
      {
        path: 'incomereport',
        component: IncomeReportComponent,
      },
      {
        path: 'taxeport',
        component: TaxReportComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product/add',
        component: ProductEditComponent
      },
      {
        path: 'product/edit',
        component: ProductEditComponent
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent
      },
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: '**', redirectTo: 'customers', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ECommerceRoutingModule {}
