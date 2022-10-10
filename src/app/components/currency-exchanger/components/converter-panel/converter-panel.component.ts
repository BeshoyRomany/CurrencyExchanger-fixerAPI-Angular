import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CURRENCIES_DATA } from '../../data/currencies.data';
import { ConvertRequest } from '../../models/convert.model';
import { Currencies } from '../../models/currencies.model';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';
import { CurrencyExchangerService } from '../../services/currency-exchanger.service';

@Component({
  selector: 'converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss'],
})
export class ConverterPanelComponent implements OnInit {
  @Output() selectedCurrencies = new EventEmitter<SelectedCurrencies>();
  convertAmountForm!: FormGroup;
  constructor(
    private router: Router,
    private currencyExchangerService: CurrencyExchangerService
  ) {}
  isConverting = false;
  currencyFrom = CURRENCIES_DATA[0];
  currencyTo = CURRENCIES_DATA[1];
  currencyPrevFrom!: Currencies;
  currencyPrevTo!: Currencies;
  defaultAmount = 1;
  convertedCurrency: number = 0;
  covertedAmountSymbol: string = '';
  currencies: Currencies[] = CURRENCIES_DATA;

  ngOnInit(): void {
    this.initSymbol();
    this.setInitConvert();
  }

  //set initial Convert
  setInitConvert() {
    let initConvertObj: ConvertRequest = {
      amount: 1,
      from: 'EUR',
      to: 'USD',
    };
    let initSeletedCurrencies: SelectedCurrencies = {
      selectedFrom: this.currencyFrom,
      selectedTo: this.currencyTo,
      amount: this.defaultAmount
    }
    this.selectedCurrencies.emit(initSeletedCurrencies)
    this.submitConvert(initConvertObj);
  }
  //Init converted symbol
  initSymbol() {
    this.covertedAmountSymbol = this.currencyTo.symbol;
  }

  //Show Details Page
  showDetails() {
    this.router.navigate(['/CurrencyExchangerDetails']);
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
      this.selectedCurrencies.emit({
        selectedFrom: this.currencyFrom,
        selectedTo: this.currencyTo,
        amount: this.defaultAmount
      })
    }
  }

  //Call server to convert
  submitConvert(convertObj: ConvertRequest) {
    this.isConverting = true;
    this.currencyExchangerService
      .convertCurrency(convertObj)
      .subscribe((response) => {
        if (response && response.result) {
          this.convertedCurrency = Number(response.result.toFixed(2));
          this.isConverting = false;
        }
      });
  }

  //Track From Value
  trackFrom(fromValue: Currencies) {
    if (fromValue == this.currencyTo) {
      this.currencyTo = this.currencyPrevFrom;
      //Set Converted Amount symbol
      this.covertedAmountSymbol = this.currencyTo.symbol;
    }

  }

  //Track To Value
  trackTo(toValue: Currencies) {
    //Set Converted Amount symbol
    this.covertedAmountSymbol = toValue.symbol;

    if (toValue == this.currencyFrom) {
      this.currencyFrom = this.currencyPrevTo;
    }

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
    this.convertedCurrency = 0
  }
}
