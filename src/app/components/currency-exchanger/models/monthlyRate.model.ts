export interface MonthlyRatesResponse {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: Rate;
}
export interface Rate {
  [date: string]: {
    [rate: string]: number;
  };
};
