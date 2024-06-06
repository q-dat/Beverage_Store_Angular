import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/App';
import { appConfig } from './app/Config';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
