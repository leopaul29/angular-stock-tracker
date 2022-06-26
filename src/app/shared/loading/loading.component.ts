import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loading">LOADING...</div>`,
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
