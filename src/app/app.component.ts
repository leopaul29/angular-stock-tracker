import { Component, OnInit } from '@angular/core';
import { StorageService } from './core2/storage.service';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.load();
  }
}
