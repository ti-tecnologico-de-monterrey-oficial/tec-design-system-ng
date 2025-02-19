import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbActionMenuComponent } from './bmb-action-menu.component';

describe('BmbActionMenuComponent', () => {
  let component: BmbActionMenuComponent;
  let fixture: ComponentFixture<BmbActionMenuComponent>;
  let componentRef: ComponentRef<BmbActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionMenuComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
