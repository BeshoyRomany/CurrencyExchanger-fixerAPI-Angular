import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoMessagesService } from '@currency-exchanger-core';
import { Subscription } from 'rxjs';
import { RESPONSE_CHART } from '../../data/chart.data';
import { CURRENCIES_DATA } from '../../data/currencies.data';
import { CurrenciesRoutes } from '../../enum/currencies-routes.enum';
import { CurrenciesMessages } from '../../enum/messages.enum';
import { ConvertRequest } from '../../models/convert.model';
import { Currencies } from '../../models/currencies.model';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';
import { CurrencyExchangerService } from '../../services/currency-exchanger.service';

@Component({
  selector: 'converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss'],
})

// #CurrencyFromCtrl
export class ConverterPanelComponent implements OnInit, OnChanges, OnDestroy {
  @Output() selectedCurrencies = new EventEmitter<SelectedCurrencies>();
  @Input() isDetails = false;
  @Input() initialConversion!: ConvertRequest;
  @Input() currencyFrom!: Currencies;
  @Input() currencyTo!: Currencies;
  @Input() currnecyAmount!: number;
  @Input() convertedCurrency: number | undefined = 0;

  converterPanelSubscriptions: Subscription[]= []
  convertAmountForm!: FormGroup;
  currencies: Currencies[] = CURRENCIES_DATA;
  isConverting = false;
  currencyPrevFrom!: Currencies;
  currencyPrevTo!: Currencies;
  covertedAmountSymbol!: string;

  constructor(
    private router: Router,
    private currencyExchangerService: CurrencyExchangerService,
    private infoMessagesService: InfoMessagesService
  ) {}

  //Detect Converter Changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.currencyTo = changes.currencyTo.currentValue;
      this.initSymbol();
    }
  }

  ngOnInit(): void {
    //Init Converted Amount Symbol
    this.initSymbol();
    //Run The Initial Conversion
    this.setInitConvert();
  }

  //set initial Convert
  setInitConvert() {
    if (!this.isDetails) {
      //Emit Initial Currencies
      this.emitSelectedCurrencies();

      //Submit initial converter
      this.submitConvert(this.initialConversion);
    }
  }
  //Init converted symbol
  initSymbol() {
    this.covertedAmountSymbol = this.currencyTo.symbol;
  }

  //Show Details Page
  showDetails() {
    let currenctSelected: SelectedCurrencies = {
      selectedFrom: this.currencyFrom,
      selectedTo: this.currencyTo,
      amount: this.currnecyAmount,
      convertedCurrency: this.convertedCurrency,
    };

    //Navigate to details and store the currenct convertion values in the state
    this.router.navigate([CurrenciesRoutes.CurrencyDetailsPage], {
      state: {
        data: currenctSelected,
      },
    });
  }
  backHome() {
    //Navigate to details and store the currenct convertion values in the state
    this.router.navigate(['/']);
  }

  //Convert Amount
  convertAmount(convertForm: NgForm) {
    if (convertForm.valid) {
      let createConvertForm: ConvertRequest = {
        amount: convertForm.controls.amount.value,
        from: convertForm.controls.from.value.shortName,
        to: convertForm.controls.to.value.shortName,
      };
      this.submitConvert(createConvertForm);
      //Emit Currencies
      this.emitSelectedCurrencies();
    }
  }

  //Call server to convert
  submitConvert(convertObj: ConvertRequest) {
    this.isConverting = true;
    let converterPanelSubscription = this.currencyExchangerService
      .convertCurrency(convertObj)
      .subscribe(
        (response) => {
          if (response && response.result) {
            this.convertedCurrency = Number(response.result.toFixed(2));
            this.isConverting = false;
          }
        },
        (errResponse) => {
          this.infoMessagesService.handleErrorMessage(
            errResponse.error.message,
            3000
          );
          setTimeout(() => {
            this.infoMessagesService.handleSuccessMessage(
              CurrenciesMessages.LimitedAPIResquests,
              7000
            );
          }, 3000);
        }
      )
      .add(() => {
        this.isConverting = false;
      });
      
      //Push the Subscription
      this.converterPanelSubscriptions.push(converterPanelSubscription);
  }

  //Track From Value
  trackFrom(fromValue: Currencies) {
    if (fromValue == this.currencyTo && !this.isDetails) {
      this.currencyTo = this.currencyPrevFrom;
    }
    //Set Converted Amount symbol
    this.covertedAmountSymbol = this.currencyTo.symbol;
    //Reset Converted Amount
    this.convertedCurrency = 0;
  }

  //Track To Value
  trackTo(toValue: Currencies) {
    if (toValue == this.currencyFrom && !this.isDetails) {
      this.currencyFrom = this.currencyPrevTo;
    }
    //Set Converted Amount symbol
    this.covertedAmountSymbol = toValue.symbol;
    //Reset Converted Amount
    this.convertedCurrency = 0;
  }

  //Set previous From value
  setFromPrev(currenctFromValue: Currencies) {
    this.currencyPrevFrom = currenctFromValue;
  }
  //Set previous to value
  setToPrev(currenctToValue: Currencies) {
    this.currencyPrevTo = currenctToValue;
  }

  //Swap Currencies
  swapCurrencies(convertForm: NgForm) {
    //Swap amounts
    this.currencyFrom = convertForm.controls.to.value;
    this.currencyTo = convertForm.controls.from.value;
    //Set Converted Amount symbol
    this.covertedAmountSymbol = this.currencyTo.symbol;
    this.convertedCurrency = 0;
  }

  //Tracks the option comparison algorithm for tracking identities when checking for "Currency Selection changes".
  compareCurrencies(currencyA: Currencies, currencyB: Currencies) {
    return currencyA && currencyB
      ? currencyA.shortName === currencyB.shortName
      : currencyA === currencyB;
  }

  //Emit Selected Currencies
  emitSelectedCurrencies() {
    this.selectedCurrencies.emit({
      selectedFrom: this.currencyFrom,
      selectedTo: this.currencyTo,
      amount: this.currnecyAmount,
    });
  }

  //Destroying
  ngOnDestroy(): void {
    //Destroying Subscriptions
    if(this.converterPanelSubscriptions && this.converterPanelSubscriptions.length > 0){
      this.converterPanelSubscriptions.forEach((subscription: Subscription)=>[
        subscription.unsubscribe()
      ])
    }
  }
}
