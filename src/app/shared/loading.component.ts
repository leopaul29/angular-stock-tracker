import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loading">LOADING...</div>`,
  styles: [],
})
export class LoadingComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
