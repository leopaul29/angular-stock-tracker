import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockTrackingService } from './core/stock-tracking.service';

@NgModule({
  declarations: [AppComponent, StockFormComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [StockTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
