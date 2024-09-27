import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHomeCardChatComponent } from './bmb-home-card-chat.component';

describe('BmbHomeCardChatComponent', () => {
  let component: BmbHomeCardChatComponent;
  let fixture: ComponentFixture<BmbHomeCardChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
