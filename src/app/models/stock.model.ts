export interface IStock {
  name: string;
  changeToday: number;
  openPrice: number;
  currentPrice: number;
  highPrice: number;
}

export interface IStockForm {
  stockSymbol: string;
}
