import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MostPopularCurrencies,
  MostPopularCurrenciesResponse,
} from '../../models/mostPopularCurrencies.model';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';
import { CurrencyExchangerService } from '../../services/currency-exchanger.service';

@Component({
  selector: 'popular-currencies-grid',
  templateUrl: './popular-currencies-grid.component.html',
  styleUrls: ['./popular-currencies-grid.component.scss'],
})
export class PopularCurrenciesGridComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() selectedCurrencies!: SelectedCurrencies;
  selectedFromCurrencyLabel: string = '';
  mostPopularCurrencies!: MostPopularCurrencies;
  popularCurrenciesSubscriptions: Subscription[] = [];
  isLoaded: boolean = false;
  notAvailable = false
  constructor(private currencyExchangerService: CurrencyExchangerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initSelectedCurrency();
  }
  ngOnInit(): void {}

  //Init Selected Currency to convert
  initSelectedCurrency() {
    this.isLoaded = false;
    if (this.selectedCurrencies && this.selectedCurrencies.selectedFrom) {
      this.selectedFromCurrencyLabel =
        this.selectedCurrencies.selectedFrom.shortName;

      //Call to get most popular currencies
      let popularCurrenciesSubscription = this.currencyExchangerService
        .getMostPopularCurrencies(
          this.selectedFromCurrencyLabel,
          this.selectedCurrencies.amount!
        )
        .subscribe(
          (currenciesResponse: MostPopularCurrenciesResponse) => {
            if (currenciesResponse) {
              this.mostPopularCurrencies = {
                AUD: Number(currenciesResponse.AUD.result.toFixed(2)),
                CAD: Number(currenciesResponse.CAD.result.toFixed(2)),
                CHF: Number(currenciesResponse.CHF.result.toFixed(2)),
                CNY: Number(currenciesResponse.CNY.result.toFixed(2)),
                HKD: Number(currenciesResponse.HKD.result.toFixed(2)),
                JPY: Number(currenciesResponse.JPY.result.toFixed(2)),
                KRW: Number(currenciesResponse.KRW.result.toFixed(2)),
                NZD: Number(currenciesResponse.NZD.result.toFixed(2)),
                SEK: Number(currenciesResponse.SEK.result.toFixed(2)),
              };
              this.isLoaded = true;
            }
          },
          (error) => {
            this.notAvailable = true
          }
        );

      this.popularCurrenciesSubscriptions.push(popularCurrenciesSubscription);
    }
  }

  //Destroying
  ngOnDestroy(): void {
    //Destroying Subscriptions
    if (
      this.popularCurrenciesSubscriptions &&
      this.popularCurrenciesSubscriptions.length > 0
    ) {
      this.popularCurrenciesSubscriptions.forEach(
        (subscription: Subscription) => [subscription.unsubscribe()]
      );
    }
  }
}
