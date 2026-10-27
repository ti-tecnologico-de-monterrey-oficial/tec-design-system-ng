export function openDefaultChatFileInput(): void {
  const input = document.getElementById('inputFile') as HTMLInputElement;
  input?.click();
}
