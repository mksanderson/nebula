import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { App } from '../../models/app';

@Component({
  selector: 'app-app-list',
  template: `
    <div class="p-4">
      <div *ngFor="let app of apps" class="border p-2 mb-2">
        <h3 class="font-bold">{{ app.title }}</h3>
        <p>{{ app.description }}</p>
        <a [href]="app.link" class="text-blue-500" target="_blank">{{ app.name }}</a>
      </div>
    </div>
  `
})
export class AppListComponent implements OnInit {
  apps: App[] = [];

  constructor(private service: AppService) {}

  ngOnInit() {
    this.service.getApps().subscribe(data => (this.apps = data));
  }
}
