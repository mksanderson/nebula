import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2 class="p-4 text-2xl">Dashboard</h2>
    <app-app-list></app-app-list>
  `
})
export class DashboardComponent {}
