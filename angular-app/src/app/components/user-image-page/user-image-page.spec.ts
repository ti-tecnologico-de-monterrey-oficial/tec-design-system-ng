import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserImagePage } from './user-image-page';

describe('UserImagePage', () => {
  let component: UserImagePage;
  let fixture: ComponentFixture<UserImagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserImagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserImagePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
