import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IStock } from '../model/stock';

@Injectable()
export class StockTrackingService {
  // https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-04-01&to=2022-06-01&token=bu4f8kn48v6uehqi3cqg

  // https://finnhub.io/api/v1/quote?symbol=AAPL&token=bu4f8kn48v6uehqi3cqg

  constructor(private http: HttpClient) {}

  getStock(symbol: string): Observable<IStock> {
    return this.http
      .get<IStock>(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bu4f8kn48v6uehqi3cqg`
      )
      .pipe(
        map(
          (stock) =>
            <IStock>{
              c: stock.c,
            }
        ),
        tap((stock) => console.log(JSON.stringify(stock)))
      );
  }
}
