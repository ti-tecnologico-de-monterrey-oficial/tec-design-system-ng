export interface IDropzoneFileLike {
  name: string;
  error?: boolean;
  errorType?: 'format' | 'size' | 'name' | null;
}

export function getDropzoneFileSizeInMB(fileSize: number): number {
  return fileSize / 1048576;
}

export function getDropzoneFileSizeInKB(fileSize: number): number {
  return fileSize / 1024;
}

export function getDropzoneFileSize(
  fileSize: number,
): { value: number; unit: 'KB' | 'MB' } {
  const sizeInMB = getDropzoneFileSizeInMB(fileSize);

  if (Math.floor(sizeInMB) === 0) {
    return { value: getDropzoneFileSizeInKB(fileSize), unit: 'KB' };
  }

  return { value: sizeInMB, unit: 'MB' };
}

export function isValidDropzoneFileSize(
  fileSize: number,
  maxSizeMB: number,
): boolean {
  return getDropzoneFileSizeInMB(fileSize) <= maxSizeMB;
}

export function isValidDropzoneFileFormat(
  fileType: string,
  fileName: string,
  acceptedExtensions: string[],
): boolean {
  if (acceptedExtensions.some((element: string) => element.includes('/'))) {
    const types = acceptedExtensions.filter((element: string) =>
      element.endsWith('/*'),
    );
    if (
      !!types.length &&
      types.some(
        (element: string) =>
          element.substring(0, element.length - 2) ===
          fileType.substring(0, element.length - 2),
      )
    ) {
      return true;
    } else {
      if (acceptedExtensions.includes(fileType)) return true;
    }
  }

  if (
    acceptedExtensions.includes(fileName.substring(fileName.lastIndexOf('.') + 1))
  )
    return true;

  return false;
}

export function getDropzoneAcceptAttribute(acceptedExtensions: string[]): string {
  return acceptedExtensions
    .map((ext) => {
      const cleanExt = ext.trim().toLowerCase();

      if (cleanExt.includes('/')) return cleanExt;
      if (cleanExt.startsWith('.')) return cleanExt;

      return `.${cleanExt}`;
    })
    .join(',');
}

export function isDropzoneFileDuplicate(
  fileDataList: IDropzoneFileLike[],
  fileName: string,
): boolean {
  return fileDataList.some((existing) => existing.name === fileName);
}

export function getDropzoneAvatarIcon(
  progress: number,
  hasError: boolean,
): string {
  if (progress === 100) return 'upload_file';
  if (hasError) return 'task';

  return 'progress_activity';
}

export function getDropzoneFileName(name: string, hasError: boolean): string {
  return hasError ? name.concat('*') : name;
}

export function getDropzoneFormatProgress(value: string, total: string): string {
  return `${value}%/${total}%`;
}

export function getDropzoneProgress(
  progress: Record<string, number> | number,
  fileName: string,
  hasError: boolean,
): number {
  if (hasError) return 0;
  if (typeof progress === 'number') return progress;
  return progress?.[fileName] ?? 0;
}

export function sortDropzoneFiles<T extends { error?: boolean }>(
  fileDataList: T[],
): T[] {
  if (fileDataList.some((file) => file.error)) {
    return [...fileDataList].sort(
      (file1, file2) => (Number(file1.error) - Number(file2.error)) * -1,
    );
  }

  return fileDataList;
}

export function hasDropzoneFileErrors(
  fileDataList: IDropzoneFileLike[],
): boolean {
  return fileDataList.some((file) => file.error);
}

export function hasDropzoneFormatErrorFiles(
  fileDataList: IDropzoneFileLike[],
): boolean {
  return fileDataList.some(
    (file) => (file.error && file.errorType === 'format') || false,
  );
}

export function hasDropzoneSizeErrorFiles(
  fileDataList: IDropzoneFileLike[],
): boolean {
  return fileDataList.some(
    (file) => (file.error && file.errorType === 'size') || false,
  );
}

export function hasDropzoneNameErrorFiles(
  fileDataList: IDropzoneFileLike[],
): boolean {
  return fileDataList.some(
    (file) => file.error && file.errorType === 'name',
  );
}

export function isDropzoneUploadInProgress(
  progress: number,
  hasError: boolean,
): boolean {
  return !hasError && progress < 100;
}

export function isDropzoneUploadCompleted(
  progress: number,
  hasError: boolean,
): boolean {
  return !hasError && progress === 100;
}
