import type { TemplateRef, Type } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import type {
  BmbTemplateMessage,
  BmbChatActionEvent,
} from './lib/_shared/types/components/ai-chat-bubble';
import type {
  ModalDataConfig,
  IBmbNativeModal,
} from './lib/_shared/types/components/modal';
import type { ITableLiteColumn } from './lib/_shared/types/components/table-lite';
import type { TableColum } from './lib/_shared/types/components/tables';
import type { IBmbCardNoticeDescription } from './lib/_shared/types/components/notice-card';
import type { IBmbProjectionContent } from './lib/services/old/projection/projection.service';
import { getInputValidatorErrorMessage } from './lib/_shared/logic/components/input-validator';
import { FormControl } from '@angular/forms';
import { showError } from './lib/_shared/logic/formControl';
import { getUniqueRadialGroupNames } from './lib/_shared/logic/components/form-validator';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Assert<T extends true> = T;
// Compile-time checks protect the concrete Angular bindings at their existing paths.
type TemplateContract = Assert<
  Equal<BmbTemplateMessage['content']['template'], TemplateRef<unknown>>
>;
type ModalContract = Assert<
  Equal<
    ModalDataConfig['content'],
    string | TemplateRef<any> | null | undefined
  >
>;
type NativeContract = Assert<
  Equal<
    IBmbNativeModal['content'],
    string | TemplateRef<any> | Type<any> | null | undefined
  >
>;
type TableLiteContract = Assert<
  Equal<ITableLiteColumn['htmlLabel'], TemplateRef<any> | undefined>
>;
type TableContract = Assert<
  Equal<TableColum['cellTemplate'], TemplateRef<any> | undefined>
>;
type NoticeContract = Assert<
  Equal<IBmbCardNoticeDescription['pageOne'], string | SafeHtml | undefined>
>;
type ProjectionContract = Assert<
  Equal<IBmbProjectionContent['content'], TemplateRef<any> | Type<any> | null>
>;
type MessageContract = Assert<
  Equal<
    Extract<
      BmbChatActionEvent['message'],
      { type: 'template' }
    >['content']['template'],
    TemplateRef<unknown>
  >
>;
type ErrorControlContract = Assert<
  Equal<Parameters<typeof showError>[0], FormControl>
>;
type RadialControlContract = Assert<
  Equal<
    Parameters<typeof getUniqueRadialGroupNames>[0][number]['control'],
    FormControl | null
  >
>;

describe('Angular compatibility adapters', () => {
  it('retains control-based error selection and stops at the first error', () => {
    const control = new FormControl('value');
    const hasError = jest
      .spyOn(control, 'hasError')
      .mockImplementation((key) => key === 'pattern');
    const options = {
      control,
      errorMessage: { pattern: 'pattern message' },
      pattern: '',
      min: undefined,
      max: undefined,
      minLength: undefined,
      maxLength: undefined,
      label: '',
    };
    expect(getInputValidatorErrorMessage(options)).toBe('pattern message');
    expect(hasError.mock.calls).toEqual([['pattern']]);
    hasError.mockClear();
    expect(
      getInputValidatorErrorMessage({ ...options, errorMessage: 'explicit' }),
    ).toBe('explicit');
    expect(hasError).not.toHaveBeenCalled();
  });
});
