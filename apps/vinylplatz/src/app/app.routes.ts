import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
