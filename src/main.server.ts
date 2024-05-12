import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/App';
import { config } from './app/Server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
