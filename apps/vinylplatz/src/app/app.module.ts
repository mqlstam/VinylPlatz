import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';
import { AlbumformComponent } from './albumform/albumform.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserAlbumListComponent } from './user-album-list/user-album-list.component';
import { AlbumRecommendationsComponent } from './album-recommendations/album-recommendations.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchasedAlbumsComponent } from './purchased/purchased.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { InterestedGenresComponent } from './interested-genres/interested-genres.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    AlbumlistComponent,
    AlbumdetailsComponent,
    AlbumformComponent,
    LoginComponent,
    RegisterComponent,
    UserAlbumListComponent,
    AlbumRecommendationsComponent,
    PurchasedAlbumsComponent,
    TransactionHistoryComponent,
    InterestedGenresComponent,
    AddFriendComponent,
    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],  providers: [ DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent],
  
})
export class AppModule {}
