import { Injectable } from '@angular/core';
import { ApiBaseClientService } from '@currency-exchanger-core';
import { forkJoin, Observable } from 'rxjs';
import { ConvertRequest, ConvertResponse } from '../models/convert.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangerService {
  constructor(private apiClientService: ApiBaseClientService) {}
  convertCurrency(convertForm: ConvertRequest): Observable<ConvertResponse> {
    return this.apiClientService.get(
      `fixer/convert?to=${convertForm.to}&from=${convertForm.from}&amount=${convertForm.amount}`
    );
  }

  convertMostPoularCurrencies(
    convertTo: string,
    convertFrom: string,
    amount: number
  ): Observable<ConvertResponse> {
    return this.apiClientService.get(
      `fixer/convert?to=${convertTo}&from=${convertFrom}&amount=${amount}`
    );
  }

  getMostPopularCurrencies(
    selectedCurrency: string,
    amount: number
  ): Observable<any> {
    return forkJoin({
      JPY: this.convertMostPoularCurrencies('JPY', selectedCurrency, amount),
      AUD: this.convertMostPoularCurrencies('AUD', selectedCurrency, amount),
      CAD: this.convertMostPoularCurrencies('CAD', selectedCurrency, amount),
      CHF: this.convertMostPoularCurrencies('CHF', selectedCurrency, amount),
      CNY: this.convertMostPoularCurrencies('CNY', selectedCurrency, amount),
      HKD: this.convertMostPoularCurrencies('HKD', selectedCurrency, amount),
      NZD: this.convertMostPoularCurrencies('NZD', selectedCurrency, amount),
      SEK: this.convertMostPoularCurrencies('SEK', selectedCurrency, amount),
      KRW: this.convertMostPoularCurrencies('KRW', selectedCurrency, amount),
    });
  }
}
