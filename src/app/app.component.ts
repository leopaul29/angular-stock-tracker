import { Component, OnInit } from '@angular/core';
import { StoreService } from './core2/store.service';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.load();
  }
}
