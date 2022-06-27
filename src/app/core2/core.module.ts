import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StocksManagerService } from './stocks-manager.service';
import { StoreService } from './store.service';
import { StocksService } from './stock.service';
import { FilterStocksService } from '../core/filter-stocks.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [
    StocksManagerService,
    StocksService,
    StoreService,
    FilterStocksService,
  ],
})
export class CoreModule {}
