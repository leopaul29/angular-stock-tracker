import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { StocksService } from '../../core/stocks.service';
import { IStock } from '../../models/stock.model';

/**
 * displays the sentiment information for the last 3 months
 */
@Component({
  selector: 'app-stock-details',
  templateUrl: 'stock-sentiment.component.html',
  styles: [],
})
export class StockSentimentComponent implements OnInit {
  stock: IStock;
  stockProfile$ = this.stocksTraking.stockProfile$;
  stockSentiment$ = this.stocksTraking.stockSentiment$;

  constructor(
    private stocksService: StocksService,
    private stocksTraking: StocksTrackingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('init sentiment');
    this.stock = this.stocksService.getStock(
      this.route.snapshot.params['symbol']
    );
    this.stocksTraking.selectedSymbolChanged(this.stock.symbol);
  }
}
