import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInteractiveItemChevronComponent } from './bmb-interactive-item-chevron.component';
import { ComponentRef } from '@angular/core';

describe('BmbInteractiveItemChevronComponent', () => {
  let component: BmbInteractiveItemChevronComponent;
  let fixture: ComponentFixture<BmbInteractiveItemChevronComponent>;
  let componentRef: ComponentRef<BmbInteractiveItemChevronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemChevronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInteractiveItemChevronComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('itemTitle', 'Title');
    componentRef.setInput('itemSubtitle', 'Subtitle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
