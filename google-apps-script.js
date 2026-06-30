// ═══════════════════════════════════════════════════════════
//  Google Apps Script — приймає заявки з сайту і пише в Sheets
//  Як підключити: див. інструкцію нижче
// ═══════════════════════════════════════════════════════════

const SHEET_NAME = 'Заявки'; // назва листа в таблиці

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    let sheet  = ss.getSheetByName(SHEET_NAME);

    // створити лист і заголовки якщо немає
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Дата / Час', "Ім'я", 'Ніша', 'Telegram / Телефон']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#b0006d').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('uk-UA'),
      data.name    || '',
      data.niche   || '',
      data.contact || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ═══════════════════════════════════════════════════════════
//  ІНСТРУКЦІЯ (5 кроків)
// ═══════════════════════════════════════════════════════════
//
//  1. Відкрийте https://sheets.google.com → створіть нову таблицю
//     (назва довільна, наприклад "Заявки з сайту")
//
//  2. У таблиці: меню Розширення → Apps Script
//     Замініть увесь код у редакторі на цей файл → Зберегти (Ctrl+S)
//
//  3. Меню Деплой → Новий деплой
//     - Тип: Веб-застосунок
//     - Виконувати як: Я (your Google account)
//     - Хто має доступ: Усі (анонімні)
//     → Деплой → скопіюйте URL вигляду:
//       https://script.google.com/macros/s/AKfy.../exec
//
//  4. Вставте цей URL у index.html:
//     const SHEETS_URL = 'https://script.google.com/macros/s/AKfy.../exec';
//
//  5. Готово! Кожна заявка з'явиться у таблиці як новий рядок.
//     При повторних змінах скрипту — робіть новий деплой (не оновлення).
// ═══════════════════════════════════════════════════════════
