import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StocksManagerService } from './stocks-manager.service';
import { StocksService } from './stock.service';
import { CustomLoaderService } from './custom-loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StocksManagerService, StocksService, CustomLoaderService],
})
export class CoreModule {}
