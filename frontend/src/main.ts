import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Zone.js is required for Angular's change detection to work properly.
// Without this import the application bootstrapping fails silently.
import 'zone.js';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
