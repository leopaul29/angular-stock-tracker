import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStockCompany } from '../model/stock-tracking.model';

const STOCKTOKEN = 'bu4f8kn48v6uehqi3cqg';

@Injectable()
export class StockTrackingService {
  // https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-04-01&to=2022-06-01&token=bu4f8kn48v6uehqi3cqg

  // https://finnhub.io/api/v1/quote?symbol=AAPL&token=bu4f8kn48v6uehqi3cqg

  // https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=bu4f8kn48v6uehqi3cqg

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<IStockCompany> {
    return this.http.get<IStockCompany>(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCKTOKEN}`
    ); /*
      .pipe(
        map(
          (stock) =>
            <IStockQuote>{
              c: stock.c,
            }
        ),
        tap((stock) => console.log(JSON.stringify(stock)))
      );*/
  }

  getStockSymbol(symbol: string): Observable<IStockCompany> {
    return this.http.get<IStockCompany>(
      `https://finnhub.io/api/v1/stock/profile?symbol=${symbol}&token=${STOCKTOKEN}`
    );
  }
}
