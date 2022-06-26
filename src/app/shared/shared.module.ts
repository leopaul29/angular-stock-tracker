import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrendArrowComponent } from './trend-arrow/trend-arrow.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TrendArrowComponent],
  exports: [TrendArrowComponent, CommonModule],
  providers: [],
})
export class SharedModule {}
