import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';
import { AlbumformComponent } from './albumform/albumform.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard'; // Import your AuthGuard



export const appRoutes: Route[] = [
  { path: '', component: AlbumlistComponent },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: AlbumlistComponent , canActivate: [AuthGuard], // Apply the AuthGuard to this route
},
  { path: 'add', component: AlbumformComponent },
  { path: 'album/:id', component: AlbumdetailsComponent },
  { path: 'edit/:id', component: AlbumformComponent }, // Add this line
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];