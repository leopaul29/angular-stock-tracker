import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks',
  template: `<app-stock-form></app-stock-form>  
  <app-stock-list ></app-stock-list>`,
  styles: [],
})
export class StockComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
