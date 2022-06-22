import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, StockFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
