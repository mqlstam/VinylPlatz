import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumRecommendationsComponent } from './album-recommendations.component';

describe('AlbumRecommendationsComponent', () => {
  let component: AlbumRecommendationsComponent;
  let fixture: ComponentFixture<AlbumRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumRecommendationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
