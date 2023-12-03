import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';
import { AlbumformComponent } from './albumform/albumform.component';



export const appRoutes: Route[] = [
  { path: '', component: AlbumlistComponent },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: AlbumlistComponent },
  { path: 'add', component: AlbumformComponent },
  { path: 'album/:id', component: AlbumdetailsComponent },
  { path: 'edit/:id', component: AlbumformComponent }, // Add this line
];