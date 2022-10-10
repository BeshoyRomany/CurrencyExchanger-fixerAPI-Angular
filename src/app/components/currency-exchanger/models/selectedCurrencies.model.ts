export class SelectedCurrencies {
  selectedTo?: {
    shortName: string,
    fullName: string,
    symbol: string
  };
  selectedFrom?:{
    shortName: string,
    fullName: string,
    symbol: string
  }
  amount?: number;
}
