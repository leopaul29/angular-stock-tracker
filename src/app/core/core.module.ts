import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StocksManagerService } from './stocks-manager.service';
import { StocksService } from './stock.service';
import { FilterStocksService } from './filter-stocks.service';
import { CustomLoaderService } from './custom-loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [
    StocksManagerService,
    StocksService,
    FilterStocksService,
    CustomLoaderService,
  ],
})
export class CoreModule {}
