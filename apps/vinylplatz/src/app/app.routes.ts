import { Route } from '@angular/router';
import {
    AboutComponent,
} from './about/About.component';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
    },
    {
        path: 'about',
        pathMatch: 'full',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];