import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit {
  // https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-04-01&to=2022-06-01&token=bu4f8kn48v6uehqi3cqg

  constructor() {}

  ngOnInit() {}
}
