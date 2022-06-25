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
