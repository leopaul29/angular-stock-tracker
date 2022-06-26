import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StocksCustomLoaderService } from './stocks-customLoader.service';
import { StocksLocalStorageService } from './stocks-localStorage.service';
import { StocksTrackingService } from './stocks-tracking.service';
import { StocksService } from './stocks.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    StocksCustomLoaderService,
    StocksTrackingService,
    StocksService,
    StocksLocalStorageService,
  ],
})
export class CoreModule {}
