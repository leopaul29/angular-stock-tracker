import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
