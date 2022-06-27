import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  IProfile,
  IQuote,
  IInsiderSentiment,
} from '../models/stock-tracking.model';
import { ISentiment, IStock } from '../models/stock.model';

@Injectable()
export class StocksTrackingService {
  private stocksUrl: string = 'https://finnhub.io/api/v1';

  private symbolSubject = new Subject<string>();
  symbolSelectedAction$ = this.symbolSubject.asObservable();

  constructor(private http: HttpClient) {}

  selectedSymbolChanged(symbol: string): void {
    this.symbolSubject.next(symbol);
  }

  stockQuote$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) =>
      this.http
        .get<IQuote>(`${this.stocksUrl}/quote?symbol=${symbol}`)
        .pipe(catchError(this.handleError<IQuote>('quote')))
    )
  );
  stockProfile$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) =>
      this.http
        .get<IProfile>(`${this.stocksUrl}/stock/profile2?symbol=${symbol}`)
        .pipe(catchError(this.handleError<IProfile>('stock/profile2')))
    )
  );

  stock$ = zip(this.stockProfile$, this.stockQuote$).pipe(
    map(([profile, quote]) => {
      return {
        symbol: profile.ticker,
        name: profile.name,
        country: profile.country,
        logo: profile.logo,
        weburl: profile.weburl,
        marketCapitalization: profile.marketCapitalization,
        changeToday: +quote.dp.toFixed(2),
        openPrice: +quote.o.toFixed(2),
        currentPrice: +quote.c.toFixed(2),
        highPrice: +quote.h.toFixed(2),
      } as IStock;
    }),
    catchError(this.handleError<IStock>('zipStock'))
  );
  stockInsiderSentiment$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) => {
      let threeMonthBefore = new Date(new Date());
      threeMonthBefore.setMonth(threeMonthBefore.getMonth() - 2);
      const from = threeMonthBefore.toISOString().substring(0, 10);
      const to = new Date().toISOString().substring(0, 10);
      console.log(
        'sentiment url:',
        `${this.stocksUrl}/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}`
      );
      return this.http
        .get<IInsiderSentiment>(
          `${this.stocksUrl}/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}`
        )
        .pipe(catchError(this.handleError<IInsiderSentiment>('sentiment')));
    })
  );

  stockSentiment$ = zip(this.stockProfile$, this.stockInsiderSentiment$).pipe(
    map(([profile, sentiment]) => {
      let stockSentiment = {
        symbol: profile.ticker,
        name: profile.name,
        logo: profile.logo,
        monthlySentiment: sentiment.data,
      } as ISentiment;

      return stockSentiment;
    }),
    catchError(this.handleError<ISentiment>('zipStockSentiment'))
  );

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
