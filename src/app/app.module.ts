import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddTokenInterceptor } from './core/add-token.interceptor';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StocksCustomLoaderService } from './core/stocks-customLoader.service';
import { StocksLocalStorageService } from './core/stocks-localStorage.service';
import { StocksTrackingService } from './core/stocks-tracking.service';
import { StocksService } from './core/stocks.service';
import {
  StockComponent,
  StockFormComponent,
  StockListComponent,
  StockThumbnailComponent,
  StockListFilterComponent,
  StockSentimentComponent,
  MontlySentimentComponent,
} from './stocks/index';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    SharedModule,
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
