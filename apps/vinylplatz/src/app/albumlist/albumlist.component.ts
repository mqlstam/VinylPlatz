import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { TransactionService } from '../services/transaction.service'; // Import the TransactionService
import {
  IAlbum,
  ApiListResponse,
  ITransaction,
  TransactionStatus,
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

  constructor(
    private albumService: AlbumService,
    private transactionService: TransactionService, // Inject the TransactionService
    private authService: AuthService // Inject AuthService

  ) {}

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.loading = true;
    this.error = null;

    this.albumService.getAll().subscribe({
      next: (apiResponse: ApiListResponse<IAlbum>) => {
        if (apiResponse.results && Array.isArray(apiResponse.results)) {
          this.albums = apiResponse.results;
        } else {
          this.albums = []; // If 'results' is missing or not an array, set albums to an empty array
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading albums. Please try again later.';
        console.error('Error fetching albums:', err);
        this.loading = false;
      },
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
    const currentUserId = this.authService.getCurrentUserId(); // Get current user ID
    if (!album._id || !currentUserId) {
      console.error('Album ID or User ID is undefined.');
      return;
    }

    const transaction: ITransaction = {
      album: album._id.toString(), // Convert ObjectId to string
      buyer: currentUserId, // Set the current user as the buyer
      seller: album.userId, // Assuming album has a userId field for the seller
      price: 10, // Replace with actual album price
      transactionDate: new Date(),
      status: TransactionStatus.Pending
    };

    this.transactionService.createTransaction(transaction).subscribe({
      next: (createdTransaction) => {
        console.log('Transaction created:', createdTransaction);
        // Handle post-purchase logic
      },
      error: (err) => {
        console.error('Error creating transaction:', err);
        // Handle error appropriately
      }
    });
  }
}
