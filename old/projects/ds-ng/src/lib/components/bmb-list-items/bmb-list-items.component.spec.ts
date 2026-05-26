import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbListItemsComponent } from './bmb-list-items.component';

describe('BmbListItemsComponent', () => {
  let component: BmbListItemsComponent;
  let fixture: ComponentFixture<BmbListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbListItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
