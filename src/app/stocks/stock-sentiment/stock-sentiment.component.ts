import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { ISentiment } from '../../models/stock.model';

/**
 * displays the sentiment information for the last 3 months
 */
@Component({
  selector: 'app-stock-details',
  templateUrl: 'stock-sentiment.component.html',
  styles: [],
})
export class StockSentimentComponent implements OnInit {
  sentiment: ISentiment;

  constructor(
    private stocksTraking: StocksTrackingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const stockSymbol = this.route.snapshot.params['symbol'];
    this.stocksTraking.stockSentiment$.subscribe(
      (data: ISentiment) => (this.sentiment = data),
      (err) => console.error(err),
      () => console.log('complete')
    );
    this.stocksTraking.selectedSymbolChanged(stockSymbol);
    this.stocksTraking.stockSentiment$;
  }
}
