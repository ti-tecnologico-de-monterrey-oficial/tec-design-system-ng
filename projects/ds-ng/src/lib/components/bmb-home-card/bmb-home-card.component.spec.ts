import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core'
import { BmbHomeCardComponent } from './bmb-home-card.component';

describe('BmbHomeCardComponent', () => {
  let component: BmbHomeCardComponent;
  let fixture: ComponentFixture<BmbHomeCardComponent>;
  let componentRef: ComponentRef<BmbHomeCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
