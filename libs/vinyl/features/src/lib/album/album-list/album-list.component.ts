import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum } from '@vinylplatz/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'vinylplatz-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit, OnDestroy {
    albums: IAlbum[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private albumService: AlbumService) {}

    ngOnInit(): void {
        this.subscription = this.albumService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.albums = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}