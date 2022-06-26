import { Component, Input, OnInit } from '@angular/core';
import { IMonthlySentiment } from '../../../models/stock-tracking.model';

@Component({
  selector: 'app-monthly-sentiment',
  templateUrl: './monthly-sentiment.component.html',
  styleUrls: ['./monthly-sentiment.component.css'],
})
export class MontlySentimentComponent implements OnInit {
  @Input() monthlySentiment: IMonthlySentiment;
  constructor() {}

  ngOnInit() {}
}
