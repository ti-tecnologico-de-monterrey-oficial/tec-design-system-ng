import { Pipe, PipeTransform } from '@angular/core';
import { BmbTranslationsService } from '../services/translations/translations.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: BmbTranslationsService) {}

  transform(key: string): string {
    return this.translationService.translate(key) || key;
  }
}
