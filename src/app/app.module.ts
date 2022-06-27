import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddTokenInterceptor } from './core/add-token.interceptor';
import { appRoutes } from './routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {
  StockComponent,
  StockFormComponent,
  StockListComponent,
  StockThumbnailComponent,
  StockSentimentComponent,
  MontlySentimentComponent,
} from './stocks/index';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockFormComponent,
    StockListComponent,
    StockThumbnailComponent,
    StockSentimentComponent,
    MontlySentimentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
