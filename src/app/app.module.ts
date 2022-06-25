import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockTrackingService } from './core/stock-tracking.service';
import { StocksService } from './core/stocks.service';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockThumbnailComponent } from './stock-list/stock-thumbnail.component';
import { StocksLocalStorageService } from './core/stocks-localStorage.service';
import { StockListFilterComponent } from './stock-list/stock-list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    StockFormComponent,
    StockListComponent,
    StockThumbnailComponent,
    StockListFilterComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, FormsModule],
  providers: [StockTrackingService, StocksService, StocksLocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
