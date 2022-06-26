export interface IQuote {
  c: number;
  dp: number;
  h: number;
  o: number;
}

export interface IProfile {
  ticker: string;
  name: string;
  country: string;
  logo: string;
  weburl: string;
  marketCapitalization: number;
}

export interface IInsiderSentiment {
  data: IMonthlySentiment[];
}

export interface IMonthlySentiment {
  change: number;
  month: number;
  mspr: number;
  symbol: String;
  year: number;
}

export interface ICountry {
  code3: string;
  country: string;
  currency: string;
  currencyCode: string;
}
