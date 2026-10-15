export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function generateTableHtml(rows: number, columns: number): string {
  let tableHtml = '<table style="border-collapse: collapse; width: 100%;">';
  for (let i = 0; i < rows; i++) {
    tableHtml += '<tr>';
    for (let j = 0; j < columns; j++) {
      tableHtml += `<td style="border: 1px solid #000; padding: 8px;">&nbsp;</td>`;
    }
    tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  return tableHtml;
}

export function getTextEditorContainerColor(name: string): string {
  return `border: 1px solid var(--${name});
          border-radius: var(--bmb-radius-xs);
          width: 1.5rem;
          height: 1.5rem;
          background: var(--${name});
          `;
}
