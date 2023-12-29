import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAlbumListComponent } from './user-album-list.component';

describe('UserAlbumListComponent', () => {
  let component: UserAlbumListComponent;
  let fixture: ComponentFixture<UserAlbumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAlbumListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
