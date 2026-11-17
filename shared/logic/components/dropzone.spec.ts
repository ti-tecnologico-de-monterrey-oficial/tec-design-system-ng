import {
  getDropzoneAcceptAttribute,
  getDropzoneAvatarIcon,
  getDropzoneFileName,
  getDropzoneFileSize,
  getDropzoneFileSizeInKB,
  getDropzoneFileSizeInMB,
  getDropzoneFormatProgress,
  getDropzoneProgress,
  hasDropzoneFileErrors,
  hasDropzoneFormatErrorFiles,
  hasDropzoneNameErrorFiles,
  hasDropzoneSizeErrorFiles,
  isDropzoneFileDuplicate,
  isDropzoneUploadCompleted,
  isDropzoneUploadInProgress,
  isValidDropzoneFileFormat,
  isValidDropzoneFileSize,
  sortDropzoneFiles,
} from './dropzone';

describe('dropzone', () => {
  describe('getDropzoneFileSizeInMB / getDropzoneFileSizeInKB', () => {
    it('should convert bytes to MB and KB', () => {
      expect(getDropzoneFileSizeInMB(1048576)).toBe(1);
      expect(getDropzoneFileSizeInKB(1024)).toBe(1);
    });
  });

  describe('getDropzoneFileSize', () => {
    it('should return KB for sizes under 1MB', () => {
      expect(getDropzoneFileSize(512)).toEqual({ value: 0.5, unit: 'KB' });
    });

    it('should return MB for sizes at or above 1MB', () => {
      expect(getDropzoneFileSize(2097152)).toEqual({ value: 2, unit: 'MB' });
    });
  });

  describe('isValidDropzoneFileSize', () => {
    it('should be true when the file is within the max size', () => {
      expect(isValidDropzoneFileSize(1048576, 2)).toBe(true);
    });

    it('should be false when the file exceeds the max size', () => {
      expect(isValidDropzoneFileSize(1048576 * 3, 2)).toBe(false);
    });
  });

  describe('isValidDropzoneFileFormat', () => {
    it('should accept a MIME wildcard match', () => {
      expect(isValidDropzoneFileFormat('image/png', 'photo.png', ['image/*'])).toBe(
        true,
      );
    });

    it('should accept an exact MIME type match', () => {
      expect(
        isValidDropzoneFileFormat('application/pdf', 'file.pdf', [
          'application/pdf',
        ]),
      ).toBe(true);
    });

    it('should accept a matching file extension', () => {
      expect(isValidDropzoneFileFormat('', 'file.pdf', ['pdf'])).toBe(true);
    });

    it('should reject a non-matching format', () => {
      expect(isValidDropzoneFileFormat('image/png', 'photo.png', ['pdf'])).toBe(
        false,
      );
    });

    it('should fall back to the extension check when the MIME type does not match directly', () => {
      expect(
        isValidDropzoneFileFormat('image/png', 'doc.pdf', [
          'application/pdf',
          'pdf',
        ]),
      ).toBe(true);
    });
  });

  describe('getDropzoneAcceptAttribute', () => {
    it('should normalize extensions into a comma-separated accept string', () => {
      expect(getDropzoneAcceptAttribute(['PDF', '.png', 'image/*'])).toBe(
        '.pdf,.png,image/*',
      );
    });
  });

  describe('isDropzoneFileDuplicate', () => {
    it('should detect a duplicate by name', () => {
      expect(
        isDropzoneFileDuplicate([{ name: 'a.png' }], 'a.png'),
      ).toBe(true);
    });

    it('should return false when there is no match', () => {
      expect(isDropzoneFileDuplicate([{ name: 'a.png' }], 'b.png')).toBe(
        false,
      );
    });
  });

  describe('getDropzoneAvatarIcon', () => {
    it('should return upload_file when progress is complete', () => {
      expect(getDropzoneAvatarIcon(100, false)).toBe('upload_file');
    });

    it('should return task when there is an error', () => {
      expect(getDropzoneAvatarIcon(50, true)).toBe('task');
    });

    it('should return progress_activity otherwise', () => {
      expect(getDropzoneAvatarIcon(50, false)).toBe('progress_activity');
    });
  });

  describe('getDropzoneFileName', () => {
    it('should append an asterisk when there is an error', () => {
      expect(getDropzoneFileName('file.png', true)).toBe('file.png*');
    });

    it('should return the plain name otherwise', () => {
      expect(getDropzoneFileName('file.png', false)).toBe('file.png');
    });
  });

  describe('getDropzoneFormatProgress', () => {
    it('should format the value/total as percentages', () => {
      expect(getDropzoneFormatProgress('50', '100')).toBe('50%/100%');
    });
  });

  describe('getDropzoneProgress', () => {
    it('should return 0 when there is an error', () => {
      expect(getDropzoneProgress(50, 'a.png', true)).toBe(0);
    });

    it('should return the numeric progress directly', () => {
      expect(getDropzoneProgress(75, 'a.png', false)).toBe(75);
    });

    it('should look up the progress by file name in a map', () => {
      expect(getDropzoneProgress({ 'a.png': 40 }, 'a.png', false)).toBe(40);
    });

    it('should default to 0 when the file is not in the map', () => {
      expect(getDropzoneProgress({}, 'a.png', false)).toBe(0);
    });

    it('should default to 0 when the progress value is nullish', () => {
      expect(
        getDropzoneProgress(undefined as unknown as number, 'a.png', false),
      ).toBe(0);
    });
  });

  describe('sortDropzoneFiles', () => {
    it('should move errored files to the front', () => {
      const files = [
        { name: 'a', error: false },
        { name: 'b', error: true },
      ];
      expect(sortDropzoneFiles(files)).toEqual([
        { name: 'b', error: true },
        { name: 'a', error: false },
      ]);
    });

    it('should return the list unchanged when there are no errors', () => {
      const files = [{ name: 'a', error: false }];
      expect(sortDropzoneFiles(files)).toBe(files);
    });
  });

  describe('hasDropzoneFileErrors', () => {
    it('should detect at least one errored file', () => {
      expect(hasDropzoneFileErrors([{ name: 'a', error: true }])).toBe(true);
    });

    it('should return false when there are no errors', () => {
      expect(hasDropzoneFileErrors([{ name: 'a', error: false }])).toBe(false);
    });
  });

  describe('hasDropzoneFormatErrorFiles / hasDropzoneSizeErrorFiles / hasDropzoneNameErrorFiles', () => {
    it('should detect a format error', () => {
      expect(
        hasDropzoneFormatErrorFiles([
          { name: 'a', error: true, errorType: 'format' },
        ]),
      ).toBe(true);
    });

    it('should detect a size error', () => {
      expect(
        hasDropzoneSizeErrorFiles([
          { name: 'a', error: true, errorType: 'size' },
        ]),
      ).toBe(true);
    });

    it('should detect a name error', () => {
      expect(
        hasDropzoneNameErrorFiles([
          { name: 'a', error: true, errorType: 'name' },
        ]),
      ).toBe(true);
    });

    it('should return false when the error type does not match', () => {
      expect(
        hasDropzoneFormatErrorFiles([
          { name: 'a', error: true, errorType: 'size' },
        ]),
      ).toBe(false);
    });
  });

  describe('isDropzoneUploadInProgress / isDropzoneUploadCompleted', () => {
    it('should be in progress when under 100 and no error', () => {
      expect(isDropzoneUploadInProgress(50, false)).toBe(true);
      expect(isDropzoneUploadCompleted(50, false)).toBe(false);
    });

    it('should be completed at 100 with no error', () => {
      expect(isDropzoneUploadInProgress(100, false)).toBe(false);
      expect(isDropzoneUploadCompleted(100, false)).toBe(true);
    });

    it('should be neither in progress nor completed when there is an error', () => {
      expect(isDropzoneUploadInProgress(50, true)).toBe(false);
      expect(isDropzoneUploadCompleted(100, true)).toBe(false);
    });
  });
});
