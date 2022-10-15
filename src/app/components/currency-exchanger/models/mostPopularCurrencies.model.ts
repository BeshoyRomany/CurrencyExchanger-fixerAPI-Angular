export class MostPopularCurrenciesResponse {
    AUD!: CurrencyResult<number>; 
    CAD!: CurrencyResult<number>;
    CHF!: CurrencyResult<number>;
    CNY!: CurrencyResult<number>;
    HKD!: CurrencyResult<number>;
    JPY!: CurrencyResult<number>;
    KRW!: CurrencyResult<number>;
    NZD!: CurrencyResult<number>;
    SEK!: CurrencyResult<number>;
  }
  export interface CurrencyResult<T> {
    result: T;
  }

  export class MostPopularCurrencies {
    AUD!: number; 
    CAD!: number;
    CHF!: number;
    CNY!: number;
    HKD!: number;
    JPY!: number;
    KRW!: number;
    NZD!: number;
    SEK!: number;
  }