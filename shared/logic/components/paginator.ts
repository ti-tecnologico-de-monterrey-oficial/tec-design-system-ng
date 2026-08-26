export const getPaginatorTotalPages = (
  totalItems: number,
  itemsPerPage: number,
): number => Math.ceil(totalItems / itemsPerPage);

export const getPaginatorPages = (totalPages: number): number[] =>
  Array.from({ length: totalPages }, (_, index) => index + 1);

export const isPaginatorPageValid = (
  page: number,
  totalPages: number,
): boolean => page >= 1 && page <= totalPages;

export const getPaginatorText = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  totalPages: number,
): string => {
  if (totalItems === 0) return `0 de ${totalPages || 0}`;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return `${startIndex} - ${endIndex} de ${totalItems}`;
};
