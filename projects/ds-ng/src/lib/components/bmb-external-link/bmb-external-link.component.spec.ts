import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbExternalLinkComponent } from './bmb-external-link.component';
import { ComponentRef } from '@angular/core';

describe('BmbExternalLinkComponent', () => {
  let component: BmbExternalLinkComponent;
  let fixture: ComponentFixture<BmbExternalLinkComponent>;
  let componentRef: ComponentRef<BmbExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbExternalLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Title');
    componentRef.setInput('subtitle', 'Subtitle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
