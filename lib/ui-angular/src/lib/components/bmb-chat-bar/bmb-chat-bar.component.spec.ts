import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChatBarComponent } from './bmb-chat-bar.component';

describe('BmbChatBarComponent', () => {
  let component: BmbChatBarComponent;
  let fixture: ComponentFixture<BmbChatBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbChatBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbChatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
