import { Component, Input, OnInit } from '@angular/core';
import { StocksManagerService } from '../../../core/stocks-manager.service';
import { IStock } from '../../../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  templateUrl: './stock-thumbnail.component.html',
  styleUrls: ['./stock-thumbnail.component.css'],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;

  constructor(private stocksManagerService: StocksManagerService) {
    this.stock = {} as IStock;
  }

  ngOnInit() {}

  clear() {
    this.stocksManagerService.removeStock(this.stock.symbol);
  }
}
