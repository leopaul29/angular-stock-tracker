import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IProfile, IQuote } from '../models/stock-tracking.model';
import { IStock } from '../models/stock.model';

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
      this.http.get<IQuote>(`${this.stocksUrl}/quote?symbol=${symbol}`).pipe(
        //tap((data) => console.log('quote', JSON.stringify(data))),
        catchError(this.handleError<IQuote>('quote'))
      )
    )
  );
  stockProfile$ = this.symbolSelectedAction$.pipe(
    switchMap((symbol) =>
      this.http
        .get<IProfile>(`${this.stocksUrl}/stock/profile2?symbol=${symbol}`)
        .pipe(
          //tap((data) => console.log('profile', JSON.stringify(data))),
          catchError(this.handleError<IProfile>('stock/profile2'))
        )
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
        changeToday: quote.dp,
        openPrice: quote.o,
        currentPrice: quote.c,
        highPrice: quote.h,
      } as IStock;
    }),
    //tap((data) => console.log('stock', JSON.stringify(data))),
    catchError(this.handleError<IStock>('zipStock'))
  );

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

/*a$ = forkJoin({
    quote: this.stockQuote$,
    profile: this.stockProfile$,
  }).pipe(
    map((stock) => {
      if (!stock.profile?.name) return;

      let s = {
        symbol: stock.profile.ticker,
        name: stock.profile.name,
        country: stock.profile.country,
        logo: stock.profile.logo,
        weburl: stock.profile.weburl,
        marketCapitalization: stock.profile.marketCapitalization,
        changeToday: stock.quote.dp,
        openPrice: stock.quote.o,
        currentPrice: stock.quote.c,
        highPrice: stock.quote.h,
      } as IStock;
      console.log('s', s);
      return s;
    }),
    tap((data) => console.log('stock', JSON.stringify(data))),
    catchError(this.handleError<IStock>('combineStock'))
  );
*/

/*stock$ = combineLatest([this.stockQuote$, this.stockProfile$]).pipe(
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
  );*/
