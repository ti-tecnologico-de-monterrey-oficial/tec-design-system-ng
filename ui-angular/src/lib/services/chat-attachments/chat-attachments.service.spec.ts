import { BmbChatAttachmentsService } from './chat-attachments.service';
import type { BmbChatAttachmentRules } from './chat-attachments.service';

describe('BmbChatAttachmentsService', () => {
  let service: BmbChatAttachmentsService;
  const file = (name = 'document.pdf', size = 1, lastModified = 1) =>
    new File([new Uint8Array(size)], name, {
      type: 'application/pdf',
      lastModified,
    });

  beforeEach(() => {
    service = new BmbChatAttachmentsService();
  });

  it('should accept extension, MIME and media wildcard formats case-insensitively', () => {
    for (const format of ['.PDF', 'APPLICATION/PDF', 'application/pdf']) {
      expect(
        service.select([file()], { acceptedFormats: [format] }, format, true)
          .errors,
      ).toEqual([]);
    }
    expect(
      service.select(
        [new File(['image'], 'photo.png', { type: 'image/png' })],
        { acceptedFormats: ['image/*'] },
        'image',
        true,
      ).accepted,
    ).toHaveLength(1);
    expect(
      service.select(
        [file('archive.tar.gz')],
        { acceptedFormats: ['.tar.gz'] },
        'compound',
        true,
      ).accepted,
    ).toHaveLength(1);
  });

  it('should keep valid files and report invalid formats and duplicates within a selection', () => {
    const valid = file();
    const result = service.select(
      [valid, file('bad.xps'), valid],
      { acceptedFormats: ['.pdf'] },
      'message',
    );
    expect(result.accepted).toEqual([valid]);
    expect(result.errors.map((error) => error.code)).toEqual([
      'format',
      'duplicate',
    ]);
    expect(result.errors[0].extension).toBe('.xps');
    expect(result.status).toBe('error');
  });

  it('should reject existing duplicates by name, size and lastModified only', () => {
    service.select([file()], {}, 'first');
    expect(service.select([file()], {}, 'second').errors[0].code).toBe(
      'duplicate',
    );
    expect(
      service.select([file('document.pdf', 2)], {}, 'third').accepted,
    ).toHaveLength(1);
    expect(
      service.select([file('document.pdf', 1, 2)], {}, 'fourth').accepted,
    ).toHaveLength(1);
  });

  it('should enforce the exact default and configured size boundaries', () => {
    expect(
      service.select([file('exact.pdf', 2 * 1024 * 1024)], {}, 'exact')
        .accepted,
    ).toHaveLength(1);
    expect(
      service.select([file('large.pdf', 2 * 1024 * 1024 + 1)], {}, 'large')
        .errors[0].code,
    ).toBe('size');
    expect(
      service.select(
        [file('decimal.pdf', 512 * 1024)],
        { maxFileSize: 0.5 },
        'decimal',
      ).accepted,
    ).toHaveLength(1);
    expect(
      service.select(
        [file('over.pdf', 512 * 1024 + 1)],
        { maxFileSize: 0.5 },
        'over',
      ).errors[0].code,
    ).toBe('size');
    expect(
      service.select([file('empty.pdf', 0)], { maxFileSize: 0 }, 'empty')
        .accepted,
    ).toHaveLength(1);
    expect(
      service.select([file()], { maxFileSize: 0 }, 'zero').errors[0].code,
    ).toBe('size');
  });

  it('should allow a configured limit greater than the default without a registered draft', () => {
    expect(
      service.select(
        [file('larger.pdf', 11 * 1024 * 1024)],
        { maxFileSize: 20 },
        'larger',
      ).accepted,
    ).toHaveLength(1);
  });

  it('should replace a registered draft for removal and clear without duplicate errors', () => {
    let files = [file()];
    const unregister = service.registerDraft(
      {
        read: () => files,
        write: (value) => {
          files = value;
        },
        rules: () => ({}),
      },
      'bar',
    );
    expect(service.select(files, {}, 'bar', true).errors).toEqual([]);
    service.select([], {}, 'bar', true);
    expect(files).toEqual([]);
    unregister();
    service.select([file()], {}, 'local');
    expect(files).toEqual([]);
  });

  it('should apply both message and registered chat bar constraints', () => {
    let files: File[] = [];
    service.registerDraft(
      {
        read: () => files,
        write: (value) => {
          files = value;
        },
        rules: () => ({ maxFileSize: 0, acceptedFormats: ['.pdf'] }),
      },
      'bar',
    );
    expect(service.select([file('bad.xps')], {}, 'format').errors[0].code).toBe(
      'format',
    );
    expect(service.select([file()], {}, 'size').errors[0].code).toBe('size');
    expect(files).toEqual([]);
  });

  it('should explicitly reject an ambiguous conversation without mutating drafts', () => {
    const write = jest.fn();
    const draft = { read: () => [], write, rules: () => ({}) };
    service.registerDraft(draft, 'first');
    const unregister = service.registerDraft({ ...draft }, 'second');
    expect(service.select([file()], {}, 'ambiguous').errors).toEqual([
      { code: 'unavailable' },
    ]);
    expect(write).not.toHaveBeenCalled();
    unregister();
    expect(service.select([file()], {}, 'single').accepted).toHaveLength(1);
  });

  it('should isolate results and drafts across conversations and retain per-message results', () => {
    const other = new BmbChatAttachmentsService();
    service.select([file('bad.xps')], { acceptedFormats: ['.pdf'] }, 'first');
    service.select([file()], {}, 'second');
    expect(service.result('first')?.errors[0].code).toBe('format');
    expect(service.result('second')?.status).toBe('selected');
    expect(other.result('first')).toBeUndefined();
    expect(other.select([file()], {}, 'first').accepted).toHaveLength(1);
  });

  it('should distinguish selection success, interrupted upload and actual upload success', () => {
    service.select([file()], {}, 'message');
    expect(service.result('message')?.status).toBe('selected');
    service.reportUploadResult('message', { code: 'interrupted' });
    expect(service.result('message')?.errors).toEqual([
      { code: 'interrupted' },
    ]);
    service.reportUploadResult('message');
    expect(service.result('message')?.status).toBe('uploaded');
  });

  it.each([-1, NaN, Infinity])(
    'should reject invalid size configuration %s',
    (maxFileSize) => {
      expect(() =>
        service.validateRules({ maxFileSize } satisfies BmbChatAttachmentRules),
      ).toThrow('maxFileSize');
    },
  );
});
