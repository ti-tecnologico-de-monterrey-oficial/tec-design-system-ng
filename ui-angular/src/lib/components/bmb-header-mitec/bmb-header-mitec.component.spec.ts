import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BmbHeaderMitecComponent } from './bmb-header-mitec.component';
import type { IBmbActionHeaderLinks } from './bmb-header-mitec.component';

const makeLinks = (version: number): IBmbActionHeaderLinks => ({
  apple: { link: 'https://example.com/apple/' + version, target: '_self' },
  android: { link: 'https://example.com/android/' + version, target: '_blank' },
  twitter: { link: 'https://example.com/twitter/' + version },
  facebook: { link: 'https://example.com/facebook/' + version },
  instagram: { link: 'https://example.com/instagram/' + version },
  youtube: { link: 'https://example.com/youtube/' + version },
});

describe('BmbHeaderMitecComponent', () => {
  let component: BmbHeaderMitecComponent;
  let fixture: ComponentFixture<BmbHeaderMitecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHeaderMitecComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbHeaderMitecComponent);
    component = fixture.componentInstance;
  });

  it('preserves optional inputs and the six default actions', () => {
    fixture.detectChanges();
    expect(component.headerLabel()).toBeUndefined();
    expect(component.actionHeaderLinks()).toBeUndefined();
    expect(component._actionHeaders.map((action) => action.icon)).toEqual([
      'bmb_apple',
      'bmb_android',
      'bmb_twitter',
      'bmb_facebook',
      'bmb_instagram',
      'bmb_youtube',
    ]);
    expect(
      fixture.nativeElement.querySelectorAll('bmb-navigation-bar button'),
    ).toHaveLength(6);
  });

  it('renders initial links and updates their href and target after input changes', () => {
    fixture.componentRef.setInput('actionHeaderLinks', makeLinks(1));
    fixture.detectChanges();
    const anchors = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll('bmb-navigation-bar a'),
      ) as HTMLAnchorElement[];
    expect(anchors().map((anchor) => anchor.href)).toEqual(
      Object.values(makeLinks(1)).map((link) => link.link),
    );
    expect(anchors()[0].target).toBe('_self');
    expect(anchors()[1].target).toBe('_blank');

    fixture.componentRef.setInput('actionHeaderLinks', makeLinks(2));
    fixture.detectChanges();
    expect(anchors().map((anchor) => anchor.href)).toEqual(
      Object.values(makeLinks(2)).map((link) => link.link),
    );

    fixture.componentRef.setInput('actionHeaderLinks', undefined);
    fixture.detectChanges();
    expect(anchors()).toHaveLength(0);
    expect(
      fixture.nativeElement.querySelectorAll('bmb-navigation-bar button'),
    ).toHaveLength(6);
  });

  it('updates the label and restores the translation fallback for an empty label', () => {
    fixture.detectChanges();
    const logo = () =>
      fixture.nativeElement.querySelector('bmb-mitec-logo-animation')
        .textContent;
    const defaultLabel = logo();
    fixture.componentRef.setInput('headerLabel', 'COLABORADORES');
    fixture.detectChanges();
    expect(logo()).toContain('COLABORADORES');
    fixture.componentRef.setInput('headerLabel', '');
    fixture.detectChanges();
    expect(logo()).toBe(defaultLabel);
  });
});
