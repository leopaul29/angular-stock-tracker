import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StocksCustomLoaderService } from './stocks-customLoader.service';
import { StocksLocalStorageService } from './stocks-localStorage.service';
import { StocksTrackingService } from './stocks-tracking.service';
import { StocksService } from './stocks.service';
import { FilterStocksService } from './filter-stocks.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [
    StocksCustomLoaderService,
    StocksTrackingService,
    StocksService,
    StocksLocalStorageService,
    FilterStocksService,
  ],
})
export class CoreModule {}
