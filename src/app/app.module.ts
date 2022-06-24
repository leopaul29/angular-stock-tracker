import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockTrackingService } from './core/stock-tracking.service';
import { StocksService } from './core/stocks.service';
import { StockListComponent } from './stocks/stock-list.component';
import { StockThumbnailComponent } from './stocks/stock-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    StockFormComponent,
    StockListComponent,
    StockThumbnailComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, FormsModule],
  providers: [StockTrackingService, StocksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
