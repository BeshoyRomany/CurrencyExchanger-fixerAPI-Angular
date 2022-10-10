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

  export interface CurrencyResult<T> {
    result: T;
  }


// AUD
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 1.541385}
// CAD
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 1.336997}
// CHF
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 0.970103}
// CNY
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 6.944056}
// HKD
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 7.618856}
// JPY
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 141.415452}
// KRW
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 1387.181659}
// NZD
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 1.743921}
// SEK
// : 
// {success: true, query: {…}, info: {…}, date: '2022-10-10', result: 10.972208}