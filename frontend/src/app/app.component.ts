import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="p-4 bg-gray-800 text-white flex justify-between">
      <h1 class="text-xl font-bold">Nebula Dashboard</h1>
      <a routerLink="/login">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
