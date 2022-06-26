import { Component, Input, OnInit } from '@angular/core';
import { IMonthlySentimentCustom } from '../../../models/stock.model';

@Component({
  selector: 'app-monthly-sentiment',
  templateUrl: './monthly-sentiment.component.html',
  styleUrls: ['./monthly-sentiment.component.css'],
})
export class MontlySentimentComponent implements OnInit {
  @Input() monthlySentiment: IMonthlySentimentCustom;
  constructor() {}

  ngOnInit() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.monthlySentiment.mspr = +this.monthlySentiment.mspr.toFixed(2);
    this.monthlySentiment.monthLabel = months[this.monthlySentiment.month];
  }
}
