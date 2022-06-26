import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { StocksService } from '../../core/stocks.service';
import { ISentiment } from '../../models/stock-tracking.model';
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
  stockSentiment: ISentiment;

  constructor(
    private stocksService: StocksService,
    private stocksTrackingService: StocksTrackingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stock = this.stocksService.getStock(
      this.route.snapshot.params['symbol']
    );
    console.log('init sentiment');
    this.stocksTrackingService.selectedSymbolChanged(this.stock.symbol);
    this.stocksTrackingService.stockSentiment$.subscribe((data) =>
      console.log('sentiment data', data)
    );
  }
}
