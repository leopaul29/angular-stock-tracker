import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StockSentimentService {
  private stocksUrl: string = 'https://finnhub.io/api/v1';

  private symbolSubject = new Subject<string>();
  symbolSelectedAction$ = this.symbolSubject.asObservable();

  selectedSymbolChanged(symbol: string): void {
    this.symbolSubject.next(symbol);
  }

  constructor() {}

  /*
  getSentiment(symbol: string) {
    // https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-04-01&to=2022-06-01&token=bu4f8kn48v6uehqi3cqg
    return this.http.get<ISentiment>(
      `${this.stocksUrl}/stock/insider-sentiment?symbol=${symbol}`
    );
  }*/
}
