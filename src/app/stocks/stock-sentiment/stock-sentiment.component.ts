import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { ISentiment } from '../../models/stock.model';

/**
 * displays the sentiment information for the last 3 months
 */
@Component({
  selector: 'app-stock-sentiment',
  templateUrl: 'stock-sentiment.component.html',
  styleUrls: ['stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit, OnDestroy {
  sentiment: ISentiment;
  sentimentSubscription: Subscription;

  constructor(
    private stocksTraking: StocksTrackingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const stockSymbol = this.route.snapshot.params['symbol'];
    this.sentimentSubscription = this.stocksTraking.stockSentiment$.subscribe(
      (data: ISentiment) => (this.sentiment = data),
      (err) => console.error(err),
      () => console.log('complete')
    );
    this.stocksTraking.selectedSymbolChanged(stockSymbol);
    this.stocksTraking.stockSentiment$;
  }

  ngOnDestroy(): void {
    this.sentimentSubscription.unsubscribe();
  }
}
