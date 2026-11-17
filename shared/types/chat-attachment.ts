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
