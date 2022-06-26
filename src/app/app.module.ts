import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StocksService } from './core/stocks.service';
import { StocksLocalStorageService } from './core/stocks-localStorage.service';
import { StocksTrackingService } from './core/stocks-tracking.service';
import { AddTokenInterceptor } from './core/add-token.interceptor';
import { StockFormComponent } from './stocks/stock-form/stock-form.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockThumbnailComponent } from './stocks/stock-list/stock-thumbnail/stock-thumbnail.component';
import { StockListFilterComponent } from './stocks/stock-list/stock-list-filter.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { StockComponent } from './stocks/stocks.component';
import { StockSentimentComponent } from './stocks/stock-sentiment/stock-sentiment.component';
import { StocksCustomLoaderService } from './core/stocks-customLoader.service';
import { MontlySentimentComponent } from './stocks/stock-sentiment/monthly-sentiment/monthly-sentiment.component';
import { StockTrendComponent } from './stocks/stock-trend/stock-trend.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockFormComponent,
    StockListComponent,
    StockThumbnailComponent,
    StockListFilterComponent,
    StockSentimentComponent,
    MontlySentimentComponent,
    StockTrendComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    StocksCustomLoaderService,
    StocksTrackingService,
    StocksService,
    StocksLocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
