import { inject, Injectable, signal } from '@angular/core';
import type { Provider } from '@angular/core';
import { buildErrorMessage } from '../../_shared/logic/utils';

export interface BmbChatAttachmentRules {
  acceptedFormats?: readonly string[];
  maxFileSize?: number;
}

export interface BmbChatAttachmentError {
  code: 'format' | 'size' | 'duplicate' | 'interrupted' | 'unavailable';
  fileName?: string;
  extension?: string;
  maxFileSize?: number;
}

export interface BmbChatAttachmentResult {
  sourceId: string;
  status: 'selected' | 'error' | 'uploaded';
  accepted: File[];
  errors: BmbChatAttachmentError[];
}

interface AttachmentDraft {
  read(): readonly File[];
  write(files: File[]): void;
  rules(): BmbChatAttachmentRules;
}

@Injectable()
export class BmbChatAttachmentsService {
  private readonly drafts = new Set<AttachmentDraft>();
  private readonly localFiles = signal<File[]>([]);
  private readonly results = signal<
    ReadonlyMap<string, BmbChatAttachmentResult>
  >(new Map());

  result(sourceId: string): BmbChatAttachmentResult | undefined {
    return this.results().get(sourceId);
  }

  registerDraft(draft: AttachmentDraft, sourceId: string): () => void {
    this.drafts.add(draft);
    if (this.drafts.size === 1 && this.localFiles().length) {
      const pending = this.localFiles();
      this.localFiles.set([]);
      this.select(pending, draft.rules(), sourceId);
    }
    return () => this.drafts.delete(draft);
  }

  validateRules(rules: BmbChatAttachmentRules): void {
    const extension = /^\.[a-z0-9]+(?:[._-][a-z0-9]+)*$/i;
    const mimeType =
      /^(?:application|audio|font|image|message|model|multipart|text|video)\/[a-z0-9][a-z0-9!#$&^_.+-]{0,126}$/i;
    const mediaWildcard = /^(?:audio|image|video)\/\*$/i;
    const invalidFormats = (rules.acceptedFormats ?? []).filter(
      (format) =>
        format !== format.trim() ||
        (!extension.test(format) &&
          !mimeType.test(format) &&
          !mediaWildcard.test(format)),
    );
    if (invalidFormats.length) {
      throw new Error(
        `The ${buildErrorMessage(['acceptedFormats'])} invalid. Use file extensions starting with "." or MIME types without parameters (for example, ".pdf", "application/pdf" or "image/*"). Invalid values: ${JSON.stringify(invalidFormats)}.`,
      );
    }
    if (
      rules.maxFileSize !== undefined &&
      (!Number.isFinite(rules.maxFileSize) || rules.maxFileSize < 0)
    ) {
      throw new Error(
        'maxFileSize must be a finite, non-negative number in MB.',
      );
    }
  }

  select(
    files: readonly File[],
    rules: BmbChatAttachmentRules,
    sourceId: string,
    replace = false,
  ): BmbChatAttachmentResult {
    this.validateRules(rules);
    if (this.drafts.size > 1) {
      return this.publish({
        sourceId,
        status: 'error',
        accepted: [],
        errors: [{ code: 'unavailable' }],
      });
    }
    const draft = this.drafts.values().next().value;
    const draftRules = draft?.rules();
    if (draftRules) this.validateRules(draftRules);
    const current = replace ? [] : [...(draft?.read() ?? this.localFiles())];
    const accepted: File[] = [];
    const errors: BmbChatAttachmentError[] = [];
    const maxFileSize = Math.min(
      rules.maxFileSize ?? 2,
      draftRules?.maxFileSize ?? rules.maxFileSize ?? 2,
    );
    for (const file of files) {
      const matchesRules = (constraints: BmbChatAttachmentRules): boolean => {
        const formats = constraints.acceptedFormats ?? [];
        return (
          !formats.length ||
          formats.some((format) => {
            const normalized = format.toLowerCase();
            if (normalized.startsWith('.')) {
              return file.name.toLowerCase().endsWith(normalized);
            }
            return normalized.endsWith('/*')
              ? file.type.toLowerCase().startsWith(normalized.slice(0, -1))
              : file.type.toLowerCase() === normalized;
          })
        );
      };
      let code: BmbChatAttachmentError['code'] | undefined;
      if (!matchesRules(rules) || (draftRules && !matchesRules(draftRules)))
        code = 'format';
      else if (file.size > maxFileSize * 1024 * 1024)
        code = 'size';
      else if (
        [...current, ...accepted].some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        )
      )
        code = 'duplicate';
      if (code) {
        const dot = file.name.lastIndexOf('.');
        errors.push({
          code,
          fileName: file.name,
          extension: dot > 0 ? file.name.slice(dot) : file.name,
          ...(code === 'size' ? { maxFileSize } : {}),
        });
      } else accepted.push(file);
    }
    const next = [...current, ...accepted];
    if (draft) draft.write(next);
    else this.localFiles.set(next);
    return this.publish({
      sourceId,
      status: errors.length ? 'error' : 'selected',
      accepted,
      errors,
    });
  }

  reportUploadResult(sourceId: string, error?: BmbChatAttachmentError): void {
    this.publish({
      sourceId,
      status: error ? 'error' : 'uploaded',
      accepted: [],
      errors: error ? [error] : [],
    });
  }

  clear(sourceId: string): void {
    const result = this.select([], {}, sourceId, true);
    if (!result.errors.length) this.results.set(new Map());
  }

  private publish(result: BmbChatAttachmentResult): BmbChatAttachmentResult {
    this.results.update((results) =>
      new Map(results).set(result.sourceId, result),
    );
    return result;
  }
}

export function provideBmbChatAttachments(): Provider {
  return {
    provide: BmbChatAttachmentsService,
    useFactory: () =>
      inject(BmbChatAttachmentsService, { optional: true, skipSelf: true }) ??
      new BmbChatAttachmentsService(),
  };
}
