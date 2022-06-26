import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IProfile, IQuote, ISentiment } from '../models/stock-tracking.model';
import { IStock } from '../models/stock.model';

@Injectable()
export class StocksCustomLoaderService {
  private stocksUrl: string = 'https://finnhub.io/api/v1';

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<IStock> {
    return this.http
      .get<IQuote>(`${this.stocksUrl}/quote?symbol=${symbol}`)
      .pipe(
        map(
          (s) =>
            <IStock>{
              symbol: symbol,
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
      .get<IProfile>(`${this.stocksUrl}/stock/profile2?symbol=${symbol}`)
      .pipe(
        map(
          (s) =>
            <IStock>{
              symbol: symbol,
              name: s.name,
              logo: s.logo,
            }
        ),
        catchError(this.handleError<IStock>('stock/profile2'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
