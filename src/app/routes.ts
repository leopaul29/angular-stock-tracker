import { Routes } from '@angular/router';
import { StockDetailsComponent } from './stocks/stock-details/stock-details.component';
import { StockComponent } from './stocks/stocks.component';

export const appRoutes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: 'stocks/:symbol', component: StockDetailsComponent },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
];
