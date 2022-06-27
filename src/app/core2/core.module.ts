import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { StocksManagerService } from './stocks-manager.service';
import { StoreService } from './store.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [StocksManagerService, StocksService, StoreService],
})
export class CoreModule {}
