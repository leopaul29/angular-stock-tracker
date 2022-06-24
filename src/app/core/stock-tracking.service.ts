import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProfile, IQuote, ISentiment } from '../models/stock-tracking.model';
import { IStock } from '../models/stock.model';

const STOCKTOKEN = 'bu4f8kn48v6uehqi3cqg';

@Injectable()
export class StockTrackingService {
  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<IStock> {
    return this.http
      .get<IQuote>(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCKTOKEN}`
      )
      .pipe(
        map(
          (s) =>
            <IStock>{
              changeToday: s.dp,
              openPrice: s.o,
              currentPrice: s.c,
              highPrice: s.h,
            }
        ),
        catchError(this.handleError<IStock>('quote'))
      );
  }

  getStockProfile(symbol: string): Observable<IStock> {
    return this.http
      .get<IProfile>(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${STOCKTOKEN}`
      )
      .pipe(
        map(
          (s) =>
            <IStock>{
              name: s.name,
            }
        ),
        catchError(this.handleError<IStock>('stock/profile2'))
      );
  }

  getSentiment(symbol: string) {
    // https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-04-01&to=2022-06-01&token=bu4f8kn48v6uehqi3cqg
    return this.http.get<ISentiment>(
      `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&token=${STOCKTOKEN}`
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
