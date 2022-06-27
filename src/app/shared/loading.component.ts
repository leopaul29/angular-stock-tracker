import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div *ngIf="loading" class="loading">LOADING...</div>`,
  styles: [],
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;
  constructor() {}
  ngOnInit() {
    this.loading = false;
  }
}
