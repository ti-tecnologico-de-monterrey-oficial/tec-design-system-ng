import {
  buildTotpControlsMap,
  getTotpCodeIndexes,
  isTotpNavigationKey,
  joinTotpCode,
  parseTotpInputIndex,
} from './totp';

describe('totp', () => {
  describe('getTotpCodeIndexes', () => {
    it('should return a sequential array of the given length', () => {
      expect(getTotpCodeIndexes(6)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it('should return an empty array for 0', () => {
      expect(getTotpCodeIndexes(0)).toEqual([]);
    });
  });

  describe('isTotpNavigationKey', () => {
    it.each(['Tab', 'Shift', 'ArrowLeft', 'ArrowRight', 'Backspace'])(
      'should return true for %s',
      (key) => {
        expect(isTotpNavigationKey(key)).toBe(true);
      },
    );

    it('should return false for a regular character key', () => {
      expect(isTotpNavigationKey('1')).toBe(false);
    });
  });

  describe('parseTotpInputIndex', () => {
    it('should parse the trailing index from the input id', () => {
      expect(parseTotpInputIndex('code_totp_3')).toBe(3);
    });

    it('should return -1 when there is no trailing index', () => {
      expect(parseTotpInputIndex('code_totp')).toBe(-1);
    });
  });

  describe('joinTotpCode', () => {
    it('should join the form values in order', () => {
      expect(
        joinTotpCode({
          name_totp_0: '1',
          name_totp_1: '2',
          name_totp_2: '3',
        }),
      ).toBe('123');
    });

    it('should return an empty string for an empty value', () => {
      expect(joinTotpCode({})).toBe('');
    });
  });

  describe('buildTotpControlsMap', () => {
    it('should build one control per code position', () => {
      const group = buildTotpControlsMap('totp', 3);

      expect(Object.keys(group)).toEqual([
        'name_totp_0',
        'name_totp_1',
        'name_totp_2',
      ]);
    });

    it('should build controls that require a single alphanumeric character', () => {
      const group = buildTotpControlsMap('totp', 1);
      const control = group['name_totp_0'];

      expect(control.valid).toBe(false);
      control.setValue('a');
      expect(control.valid).toBe(true);
    });
  });
});
