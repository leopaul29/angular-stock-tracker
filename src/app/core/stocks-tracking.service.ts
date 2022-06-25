import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { IProfile, IQuote } from '../models/stock-tracking.model';
import { IStock } from '../models/stock.model';

const STOCKTOKEN = 'bu4f8kn48v6uehqi3cqg';
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
    switchMap((symbol) =>
      this.http
        .get<IQuote>(
          `${this.stocksUrl}/quote?symbol=${symbol}&token=${STOCKTOKEN}`
        )
        .pipe(
          //tap((data) => console.log('quote', JSON.stringify(data))),
          catchError(this.handleError<IQuote>('quote'))
        )
    )
  );
  stockProfile$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol) =>
      this.http
        .get<IProfile>(
          `${this.stocksUrl}/stock/profile2?symbol=${symbol}&token=${STOCKTOKEN}`
        )
        .pipe(
          //tap((data) => console.log('profile', JSON.stringify(data))),
          catchError(this.handleError<IProfile>('stock/profile2'))
        )
    )
  );
  stock$ = combineLatest([this.stockQuote$, this.stockProfile$]).pipe(
    map(([quote, profile]) => {
      if (!profile?.name) return;

      return {
        symbol: profile.ticker,
        name: profile.name,
        country: profile.country,
        logo: profile.logo,
        weburl: profile.weburl,
        marketCapitalization: profile.marketCapitalization,
        changeToday: quote.dp,
        openPrice: quote.o,
        currentPrice: quote.c,
        highPrice: quote.h,
      } as IStock;
    }),
    tap((data) => console.log('stock', JSON.stringify(data))),
    catchError(this.handleError<IStock>('combineStock'))
  );

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
/*
stockQuote$ = this.http
  .get<IQuote>(
    `${this.stocksUrl}/quote?symbol=${this.symbol}&token=${STOCKTOKEN}`
  )
  .pipe(
    //tap((data) => console.log('quote', JSON.stringify(data))),
    catchError(this.handleError<IQuote>('quote'))
  );
*/

/*
  stockProfile$ = this.http
    .get<IProfile>(
      `${this.stocksUrl}/stock/profile2?symbol=${this.symbol}&token=${STOCKTOKEN}`
    )
    .pipe(
      //tap((data) => console.log('profile', JSON.stringify(data))),
      catchError(this.handleError<IProfile>('stock/profile2'))
    );
*/
