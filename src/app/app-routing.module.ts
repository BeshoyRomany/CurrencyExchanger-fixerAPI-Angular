import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertedCurrencyDetailsComponent } from './components/currency-exchanger/components/converted-currency-details/converted-currency-details.component';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';

const routes: Routes = [
  { path: '', component: CurrencyExchangerComponent },
  {
    path: 'CurrencyExchangerDetails',
    component: ConvertedCurrencyDetailsComponent,
  },
  {path: '**', component: CurrencyExchangerComponent, redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
