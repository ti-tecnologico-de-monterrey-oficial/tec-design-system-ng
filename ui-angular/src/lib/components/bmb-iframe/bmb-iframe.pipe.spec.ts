import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { BmbIframePipeTransform } from './bmb-iframe.pipe';

describe('BmbIframePipeTransform', () => {
  it('should delegate trusted resource URLs to DomSanitizer', () => {
    const trustedUrl = {};
    const sanitizer = {
      bypassSecurityTrustResourceUrl: jest.fn().mockReturnValue(trustedUrl),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: sanitizer }],
    });

    const pipe = TestBed.runInInjectionContext(
      () => new BmbIframePipeTransform(),
    );
    const url = 'https://example.com/embed';

    expect(pipe.transform(url)).toBe(trustedUrl);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(url);
  });
});
