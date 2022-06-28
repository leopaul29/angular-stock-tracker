import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent implements OnInit {
  title: string;
  constructor() {}

  ngOnInit(): void {
    this.title = environment.title;
  }
}
