'use strict';

class TableTemplate {
  static fillIn(id, dict, columnName) {
    const table = document.getElementById(id);
    if (!table) return;

    const templateProcessor = new Cs142TemplateProcessor('');

    const headerRow = table.rows[0];
    const colCount = headerRow.cells.length;
    let targetColIndex = -1;

    // Process header
    // First pass: check for columnName before replacing header
    for (let i = 0; i < colCount; i++) {
      const rawHeader = headerRow.cells[i].textContent;
      const processed = new Cs142TemplateProcessor(rawHeader).fillIn(dict);

      if (columnName && processed.trim() === columnName) {
        targetColIndex = i;
      }

      // Replace after checking
      headerRow.cells[i].textContent = processed;
    }
    // Determine if we should process all columns
    const processAll = columnName === undefined;

    // Process body
    for (let r = 1; r < table.rows.length; r++) {
      const row = table.rows[r];

      if (processAll) {
        for (let c = 0; c < colCount; c++) {
          const cell = row.cells[c];
          templateProcessor.template = cell.textContent;
          cell.textContent = templateProcessor.fillIn(dict);
        }
      } else if (targetColIndex !== -1) {
        const cell = row.cells[targetColIndex];
        templateProcessor.template = cell.textContent;
        cell.textContent = templateProcessor.fillIn(dict);
      }
    }

    // Make table visible
    table.style.visibility = 'visible';
  }
}
