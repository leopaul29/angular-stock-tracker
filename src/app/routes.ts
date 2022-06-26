import { Routes } from '@angular/router';
import { StockSentimentComponent } from './stocks/stock-sentiment/stock-sentiment.component';
import { StockComponent } from './stocks/stocks.component';

export const appRoutes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: 'sentiment/:symbol', component: StockSentimentComponent },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
];
