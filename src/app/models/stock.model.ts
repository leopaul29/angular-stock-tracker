import { IMonthlySentiment } from './stock-tracking.model';

export interface IStock {
  symbol: string;
  name: string;
  changeToday: number;
  openPrice: number;
  currentPrice: number;
  highPrice: number;
  country: string;
  logo: string;
  weburl: string;
  marketCapitalization: number;
}

export interface IStockForm {
  stockSymbol: string;
}

export interface ISentiment {
  symbol: string;
  name: string;
  logo: string;
  monthlySentiment: IMonthlySentimentCustom[];
}

export interface IMonthlySentimentCustom {
  change: number;
  month: number;
  mspr: number;
  symbol: String;
  year: number;
}
