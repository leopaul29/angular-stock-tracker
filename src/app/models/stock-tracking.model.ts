export interface IQuote {
  c: number;
  dp: number;
  h: number;
  o: number;
}

export interface IProfile {
  ticker: string;
  name: string;
}

export interface ISentiment {
  data: IMonthlySentiment[];
}

export interface IMonthlySentiment {
  change: number;
  month: number;
  mspr: number;
  symbol: String;
  year: number;
}
