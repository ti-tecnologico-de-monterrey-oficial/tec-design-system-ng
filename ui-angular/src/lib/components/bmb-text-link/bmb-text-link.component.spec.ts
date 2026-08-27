import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextLinkComponent } from './bmb-text-link.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('BmbTextLinkComponent', () => {
  let component: BmbTextLinkComponent;
  let fixture: ComponentFixture<BmbTextLinkComponent>;
  let componentRef: ComponentRef<BmbTextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTextLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('textLink', 'Text Link');
    componentRef.setInput('link', 'https://external.com');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
