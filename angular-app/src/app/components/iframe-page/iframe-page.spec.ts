import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframePage } from './iframe-page';

describe('IframePage', () => {
  let component: IframePage;
  let fixture: ComponentFixture<IframePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframePage],
    }).compileComponents();

    fixture = TestBed.createComponent(IframePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the iframe controls', () => {
    component.setSrc('https://example.com/embed');
    component.setWidth('640');
    component.setHeight('480');
    component.setLoading('eager');
    component.setName('Example iframe');
    fixture.detectChanges();

    expect(component.src()).toBe('https://example.com/embed');
    expect(component.width()).toBe('640');
    expect(component.height()).toBe('480');
    expect(component.loading()).toBe('eager');
    expect(component.name()).toBe('Example iframe');
  });
});
