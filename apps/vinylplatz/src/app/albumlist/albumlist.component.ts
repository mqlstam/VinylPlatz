import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { TransactionService } from '../services/transaction.service'; // Import the TransactionService
import {
  IAlbum,
  ApiListResponse,
  ITransaction,
} from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css'],
})
export class AlbumlistComponent implements OnInit {
  albums: IAlbum[] = [];
  loading = false;
  error: string | null = null;
  currentUserId: string | null = null;

  constructor(
    private albumService: AlbumService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.loadAlbums();
  }

  loadAlbums() {
    this.loading = true;
    this.error = null;

    this.albumService.getAvailableAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading albums. Please try again later.';
        console.error('Error fetching albums:', err);
        this.loading = false;
      }
    });
  }


  deleteAlbum(id: string) {
    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.delete(id).subscribe({
        next: () => {
          this.loadAlbums(); // Refresh the album list after deletion
        },
        error: (err) => {
          console.error('Error deleting album:', err);
          // Handle error appropriately
        },
      });
    }
  }
  buyAlbum(album: IAlbum) {
    const currentUserId = this.authService.getCurrentUserId();

    if (!album._id || !currentUserId) {
      console.error('Album ID or User ID is undefined.');
      return;
    }

    const transaction: ITransaction = {
      album: album._id.toString(),
      buyer: currentUserId,
      seller: album.userId,
      transactionDate: new Date()
    };

    this.transactionService.createTransaction(transaction).subscribe({
      next: (createdTransaction) => {
        console.log('Transaction created:', createdTransaction);
        // Handle post-purchase logic, e.g., show a success message
      },
      error: (err) => {
        console.error('Error creating transaction:', err);
        // Handle error, e.g., show an error message
      }
    });
  }

  isOwnAlbum(album: IAlbum): boolean {
    return album.userId === this.currentUserId;
  }
}
