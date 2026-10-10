export function resolveTopBarImage(
  currentImage: string,
  mitec: boolean,
  defaultImage: string,
  mitecImage: string,
): string {
  if (currentImage !== '') return currentImage;

  return mitec ? mitecImage : defaultImage;
}
