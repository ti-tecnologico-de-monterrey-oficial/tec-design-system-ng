import { getInitialFieldValue, showError } from './formControl-core';
import { getDatepickerValidationResult } from './components/datepicker-core';
import { getPhoneNumberValidationResult } from './components/input-phone-number-core';
import { getInputErrorMessage } from './components/input-validator-core';
import {
  getTotpCodeIndexes,
  joinTotpCode,
  parseTotpInputIndex,
} from './components/totp-core';
import { translateDictionary, mergeDictionary } from './services/translations';
import { resolveInitialTheme, resolveRequestedTheme } from './services/theme';
import { normalizeIconName, getIconUrl } from './services/icon';
import {
  appendItems,
  removeItemBy,
  patchItemBy,
  hasItemBy,
} from './services/collections';
import {
  getInitialAccordionState,
  getOpenedAccordionState,
} from './directives/accordion-control';
import {
  generateGridArray,
  getGridRules,
  getBmbLayoutGridItemElementStyle,
} from './directives/bmb-layout-grid';
import { getBmbLayoutElementClass } from './directives/bmb-layout';
import { createDefaultActionList } from './components/chat-bar-defaults';
import { calculateTooltipPositionFromRect } from './components/tooltip-position';

describe('framework-independent behavior contracts', () => {
  it('preserves input initial values and returns separate multiple-file arrays', () => {
    for (const type of [
      'radio',
      'checkbox',
      'phone',
      'number',
      'switch',
    ] as const)
      expect(getInitialFieldValue(type)).toBeNull();
    expect(getInitialFieldValue('text')).toBe('');
    expect(getInitialFieldValue('file')).toBeNull();
    expect(getInitialFieldValue('file', true)).toEqual([null]);
    expect(getInitialFieldValue('file', true)).not.toBe(
      getInitialFieldValue('file', true),
    );
    expect(showError(undefined)).toBe(false);
    expect(showError({ invalid: true, touched: false, dirty: true })).toBe(
      true,
    );
    expect(showError({ invalid: true, touched: false, dirty: false })).toBe(
      false,
    );
  });

  it('validates plain date values and preserves custom callback identity and short circuits', () => {
    const validate = jest.fn((value: string) =>
      value === '15/06/2024' ? { customValidation: true } : null,
    );
    expect(
      getDatepickerValidationResult('', 'dd/MM/yyyy', validate, '', ''),
    ).toEqual({ errors: null });
    expect(
      getDatepickerValidationResult('invalid', 'dd/MM/yyyy', validate, '', '')
        .errors,
    ).toEqual({ customValidation: true });
    expect(validate).not.toHaveBeenCalled();
    expect(
      getDatepickerValidationResult(
        '15/06/2024',
        'dd/MM/yyyy',
        validate,
        '15/06/2024',
        { customValidation: 'custom' },
      ),
    ).toEqual({ errors: { customValidation: true }, message: 'custom' });
    expect(validate).toHaveBeenCalledWith('15/06/2024');
  });

  it('preserves phone validation precedence without Angular controls', () => {
    const validate = jest.fn(() => null);
    expect(
      getPhoneNumberValidationResult(
        '',
        true,
        true,
        '+52',
        10,
        validate,
        '',
        '',
      ),
    ).toEqual({ errors: null });
    expect(
      getPhoneNumberValidationResult(
        'x',
        true,
        true,
        '+52',
        10,
        validate,
        'x',
        '',
      ),
    ).toEqual({ errors: { pattern: true } });
    expect(
      getPhoneNumberValidationResult(
        'x',
        false,
        true,
        '+52',
        10,
        validate,
        'x',
        '',
      ),
    ).toEqual({ errors: { minlength: true } });
    expect(validate).not.toHaveBeenCalled();
    expect(
      getPhoneNumberValidationResult(
        '+521234567890',
        false,
        false,
        '+52',
        10,
        validate,
        '+521234567890',
        '',
      ),
    ).toEqual({ errors: null, message: '' });
    expect(validate).toHaveBeenCalledTimes(1);
  });

  it('preserves explicit input messages and error priority', () => {
    const options = {
      errors: { pattern: true, required: true },
      errorMessage: { pattern: 'pattern first', required: 'required' },
      pattern: '',
      min: 0,
      max: 0,
      minLength: 0,
      maxLength: 0,
      label: 'field',
    };
    expect(getInputErrorMessage(options)).toBe('pattern first');
    expect(getInputErrorMessage({ ...options, errorMessage: 'explicit' })).toBe(
      'explicit',
    );
  });

  it('retains TOTP order and index parsing', () => {
    expect(getTotpCodeIndexes(3)).toEqual([0, 1, 2]);
    expect(joinTotpCode({ a: '0', b: '2' })).toBe('02');
    expect(parseTotpInputIndex('code_12')).toBe(12);
    expect(parseTotpInputIndex('code')).toBe(-1);
  });

  it('preserves shallow dictionary merges, fallback and each framework traversal policy', () => {
    const first = { section: { title: 'old', other: 'value' } };
    const result = mergeDictionary(first, { section: { title: 'new' } });
    expect(result).toEqual({ section: { title: 'new' } });
    expect(first.section.title).toBe('old');
    expect(translateDictionary(result, 'section.title')).toBe('new');
    expect(translateDictionary(result, 'section')).toBe('section');
    expect(translateDictionary(result, 'missing')).toBe('missing');
    expect(translateDictionary({ label: 'abc' }, 'label.0')).toBe('a');
    expect(translateDictionary({ label: 'abc' }, 'label.0', true)).toBe(
      'label.0',
    );
  });

  it('preserves theme precedence and icon URL construction', () => {
    expect(resolveInitialTheme('', 'light')).toBe('light');
    expect(resolveRequestedTheme('dark', 'light', 'default')).toBe('dark');
    expect(resolveRequestedTheme(null, '', 'default')).toBe('default');
    expect(normalizeIconName(' Arrow Back ')).toBe('arrow_back');
    expect(getIconUrl('/assets/icons', 'arrow_back', true)).toBe(
      '/assets/icons/arrow_back-fill.svg',
    );
  });

  it('preserves collection order, references and duplicate removal', () => {
    const a = { id: 'a', value: 1 },
      b = { id: 'b', value: 2 };
    const original = [a, b, a];
    expect(appendItems(original, [b])).toEqual([a, b, a, b]);
    expect(removeItemBy(original, 'id', 'a')).toEqual([b]);
    const patched = patchItemBy(original, 'id', 'a', { value: 3 });
    expect(patched[1]).toBe(b);
    expect(patched[0].value).toBe(3);
    expect(original[0].value).toBe(1);
    expect(hasItemBy(original, 'id', 'b')).toBe(true);
  });

  it('preserves controlled and uncontrolled accordion decisions', () => {
    expect(getInitialAccordionState({}, 'a', 0)).toEqual({
      disabled: false,
      expanded: true,
      active: true,
    });
    expect(getInitialAccordionState({}, 'b', 1)).toEqual({
      disabled: false,
      expanded: false,
      active: false,
    });
    expect(getInitialAccordionState({ a: true }, 'b', 0)).toEqual({
      disabled: true,
      expanded: false,
      active: false,
    });
    expect(getOpenedAccordionState('b', 'a', false)).toEqual({
      disabled: false,
      expanded: false,
      active: false,
    });
  });

  it('preserves grid rules, grid-area output and responsive layout class order', () => {
    expect(generateGridArray(['100px', '1fr'], 4)).toBe('100px repeat(3, 1fr)');
    expect(getGridRules('1fr', 2)).toBe('repeat(2, 1fr)');
    expect(
      getBmbLayoutGridItemElementStyle({
        rowStart: 1,
        colStart: 2,
        numberOfRows: 2,
        numberOfColumns: 3,
      }).trim(),
    ).toBe('grid-area: 1 / 2 / 3 / 5;');
    expect(
      getBmbLayoutElementClass({
        gapSize: 'm',
        margin: 'm',
        justify: 'start',
        flow: 'row',
        alignItems: 'start',
        dynamicCols: false,
        isContainerQuery: undefined,
        avoidRowWrap: false,
        horizontalScroll: false,
      }),
    ).toEqual([
      'bmb_gap-m',
      'bmb_margin-m',
      'bmb_justify-start',
      'bmb_layout-flow-row',
      'bmb_align-items-start',
      'bmb_justify-start',
      'bmb_layout',
    ]);
  });

  it('uses the caller upload action and computes tooltip placement from plain measurements', () => {
    const upload = jest.fn();
    createDefaultActionList(upload)[0].action?.();
    expect(upload).toHaveBeenCalledTimes(1);
    expect(
      calculateTooltipPositionFromRect({
        targetPosition: { left: 20, right: 80, top: 10, bottom: 30 },
        tooltipWidth: 100,
        windowWidth: 200,
        windowHeight: 100,
      }),
    ).toEqual({ top: '38px', bottom: null, left: '50px', right: null });
  });
});
