import {
  ChangeDetectorRef,
  effect,
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { BmbTranslationsService } from '../services/translations/translations.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private translationService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );
  private cdr = inject(ChangeDetectorRef);

  private readonly translationUpdatesEffect = effect(() => {
    this.translationService.getTranslationVersion();
    this.cdr.markForCheck();
  });

  transform(key: string): string {
    return this.translationService.translate(key) || key;
  }
}
