import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { AlbumService } from './album/album.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [AlbumListComponent, AlbumDetailComponent],
  providers: [AlbumService],
  exports: [AlbumListComponent, AlbumDetailComponent],
})
export class FeaturesModule {}