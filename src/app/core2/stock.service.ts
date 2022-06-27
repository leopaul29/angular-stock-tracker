import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  IProfile,
  IQuote,
  IInsiderSentiment,
} from '../models/stock-tracking.model';
import { ISentiment, IStock } from '../models/stock.model';

@Injectable()
export class StocksService implements OnInit {
  // API Urls
  private stockUrl: string = 'https://finnhub.io/api/v1';
  private stockQuoteUrl: string = this.stockUrl + '/quote';
  private stockProfileUrl: string = this.stockUrl + '/stock/profile2';
  private stockInsiderSentiment: string =
    this.stockUrl + '/stock/insider-sentiment';

  private symbolSubject = new Subject<string>();
  symbolSelectedAction$ = this.symbolSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  selectedSymbolChanged(symbol: string): void {
    this.symbolSubject.next(symbol);
  }

  /**
   * Stock
   */
  stockQuote$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) =>
      this.http
        .get<IQuote>(`${this.stockQuoteUrl}?symbol=${symbol}`)
        .pipe(catchError(this.handleError<IQuote>('quote')))
    ),
    catchError(this.handleError<IQuote>('switchMap quote'))
  );
  stockProfile$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) =>
      this.http
        .get<IProfile>(`${this.stockProfileUrl}?symbol=${symbol}`)
        .pipe(catchError(this.handleError<IProfile>('stock/profile2')))
    ),
    catchError(this.handleError<IProfile>('switchMap profile'))
  );

  stock$ = zip(this.stockProfile$, this.stockQuote$).pipe(
    map(([profile, quote]) => {
      if (!!(profile?.name && quote?.c != 0)) {
        return {
          symbol: profile?.ticker,
          name: profile?.name,
          country: profile?.country,
          logo: profile?.logo,
          weburl: profile?.weburl,
          marketCapitalization: profile?.marketCapitalization,
          changeToday: +quote?.dp.toFixed(2),
          openPrice: +quote?.o.toFixed(2),
          currentPrice: +quote?.c.toFixed(2),
          highPrice: +quote?.h.toFixed(2),
        } as IStock;
      } else {
        console.error('stock undefined');
      }
    }),
    catchError(this.handleError<IStock>('zipStock'))
  );

  /**
   * Stock sentiment
   */
  stockInsiderSentiment$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol: string) => {
      let threeMonthBefore = new Date(new Date());
      threeMonthBefore.setMonth(threeMonthBefore.getMonth() - 2);
      const from = threeMonthBefore.toISOString().substring(0, 10);
      const to = new Date().toISOString().substring(0, 10);
      return this.http
        .get<IInsiderSentiment>(
          `${this.stockInsiderSentiment}?symbol=${symbol}&from=${from}&to=${to}`
        )
        .pipe(catchError(this.handleError<IInsiderSentiment>('sentiment')));
    }),
    catchError(this.handleError<IInsiderSentiment>('switchMap sentiment'))
  );

  stockSentiment$ = zip(this.stockProfile$, this.stockInsiderSentiment$).pipe(
    map(([profile, sentiment]) => {
      let stockSentiment = {
        symbol: profile?.ticker,
        name: profile?.name,
        logo: profile?.logo,
        monthlySentiment: sentiment.data,
      } as ISentiment;

      return stockSentiment;
    }),
    catchError(this.handleError<ISentiment>('zipStockSentiment'))
  );

  /**
   * Error handling
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
