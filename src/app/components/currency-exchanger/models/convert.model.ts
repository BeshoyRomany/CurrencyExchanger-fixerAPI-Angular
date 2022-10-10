export class ConvertRequest {
  amount?: number;
  from?: string;
  to?: string;
}

export class ConvertResponse {
  date?: string;
  historical?: boolean;
  info?: {
    rate: number;
    timestamp: number;
  };
  query?: {
    amount?: 5;
    from?: string;
    to?: string;
  };
  result?: number;
  success?: true;
}
