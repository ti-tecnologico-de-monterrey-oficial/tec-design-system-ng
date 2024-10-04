import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbHitoCardComponent } from './bmb-hito-card.component';

describe('BmbHitoCardComponent', () => {
  let component: BmbHitoCardComponent;
  let fixture: ComponentFixture<BmbHitoCardComponent>;
  let componentRef: ComponentRef<BmbHitoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHitoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHitoCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('id', 'hito-id');
    componentRef.setInput('type', 'active');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
