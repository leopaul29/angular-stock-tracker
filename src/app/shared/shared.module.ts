import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { TrendArrowComponent } from './trend-arrow/trend-arrow.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TrendArrowComponent, LoadingComponent],
  exports: [TrendArrowComponent, LoadingComponent, CommonModule],
  providers: [],
})
export class SharedModule {}
