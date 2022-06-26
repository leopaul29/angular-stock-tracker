import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend-arrow',
  templateUrl: './trend-arrow.component.html',
  styleUrls: ['./trend-arrow.component.css'],
})
export class TrendArrowComponent implements OnInit {
  @Input() trend: number;
  constructor() {}

  ngOnInit() {}
}
