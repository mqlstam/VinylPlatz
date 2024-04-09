import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestedGenresComponent } from './interested-genres.component';

describe('InterestedGenresComponent', () => {
  let component: InterestedGenresComponent;
  let fixture: ComponentFixture<InterestedGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestedGenresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestedGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
