import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StocksService } from '../../core2/stock.service';
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
    private stocksService: StocksService,
    private route: ActivatedRoute
  ) {
    this.sentiment = {} as ISentiment;
    this.sentimentSubscription = new Subscription();
  }

  ngOnInit() {
    const stockSymbol: string = this.route.snapshot.params['symbol'];
    this.sentimentSubscription = this.stocksService.stockSentiment$.subscribe(
      (data: ISentiment) => (this.sentiment = data),
      (err) => console.error(err),
      () => console.log('Complete retrieve sentiment')
    );
    this.stocksService.selectedSymbolChanged(stockSymbol);
    this.stocksService.stockSentiment$;
  }

  ngOnDestroy(): void {
    this.sentimentSubscription.unsubscribe();
  }
}
