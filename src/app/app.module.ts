import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockTrackingService } from './core/stock-tracking.service';
import { StocksService } from './core/stocks.service';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockThumbnailComponent } from './stock-list/stock-thumbnail.component';
import { StocksLocalStorageService } from './core/stocks-localStorage.service';
import { StockListFilterComponent } from './stock-list/stock-list-filter.component';
import { StocksTrackingService } from './core/stocks-tracking.service';
import { AddTokenInterceptor } from './core/add-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StockFormComponent,
    StockListComponent,
    StockThumbnailComponent,
    StockListFilterComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, FormsModule],
  providers: [
    StockTrackingService,
    StocksTrackingService,
    StocksService,
    StocksLocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
