import { Currencies } from "./currencies.model";

export class SelectedCurrencies {
  selectedTo!: Currencies;
  selectedFrom!: Currencies
  amount!: number;
  convertedCurrency?: number
}
