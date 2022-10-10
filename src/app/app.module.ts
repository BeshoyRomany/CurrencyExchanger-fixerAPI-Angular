import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { CurrencyExchangerHeaderComponent } from './components/currency-exchanger/components/currency-exchanger-header/currency-exchanger-header.component';
import { ConverterPanelComponent } from './components/currency-exchanger/components/converter-panel/converter-panel.component';
import { PopularCurrenciesGridComponent } from './components/currency-exchanger/components/popular-currencies-grid/popular-currencies-grid.component';
import { ConvertedCurrencyDetailsComponent } from './components/currency-exchanger/components/converted-currency-details/converted-currency-details.component';
import { MonthlyRateChartComponent } from './components/currency-exchanger/components/converted-currency-details/components/monthly-rate-chart/monthly-rate-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CurrencyExchangerComponent,
    CurrencyExchangerHeaderComponent,
    ConverterPanelComponent,
    PopularCurrenciesGridComponent,
    ConvertedCurrencyDetailsComponent,
    MonthlyRateChartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
