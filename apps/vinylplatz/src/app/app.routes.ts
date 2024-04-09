import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';
import { AlbumformComponent } from './albumform/albumform.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Import the RegisterComponent
import { AuthGuard } from './services/auth.guard'; // Import your AuthGuard
import { UserAlbumListComponent } from './user-album-list/user-album-list.component'; // Import your UserAlbumListComponent
import { AlbumRecommendationsComponent } from './album-recommendations/album-recommendations.component'; // Import the component
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component'; // Import the component
import { PurchasedAlbumsComponent } from './purchased/purchased.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { InterestedGenresComponent } from './interested-genres/interested-genres.component';

export const appRoutes: Route[] = [
  { path: '', component: AlbumlistComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: AlbumlistComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard to this route
  { path: 'add', component: AlbumformComponent, canActivate: [AuthGuard] }, // You might want to protect this route as well
  { path: 'album/:id', component: AlbumdetailsComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AlbumformComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard to edit route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // Add the register route
  { path: 'user-albums', component: UserAlbumListComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard to this route
  { path: 'recommendations', component: AlbumRecommendationsComponent, canActivate: [AuthGuard] }, // Add the new route

  { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard to this route
  { path: 'purchased', component: PurchasedAlbumsComponent, canActivate: [AuthGuard]},
  { path: 'add-friend', component: AddFriendComponent, canActivate: [AuthGuard] },
  { path: 'interested-genres', component: InterestedGenresComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: '' },
];
