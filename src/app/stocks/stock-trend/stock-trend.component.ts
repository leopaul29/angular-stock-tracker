import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-trend',
  templateUrl: './stock-trend.component.html',
  styleUrls: ['./stock-trend.component.css']
})
export class StockTrendComponent implements OnInit {
@Input() trend:number
  constructor() { }

  ngOnInit() {
  }

}