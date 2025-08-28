import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExcelPage } from '../pages/ExcelPage';

test('Verifying TODAY() returns the expected date', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const excelPage = new ExcelPage(page);

  await loginPage.goto();
  await loginPage.login();
  await excelPage.openExcel();
  await excelPage.createNewWorkbook();
  await excelPage.enterTodayFormula();
  await excelPage.closePopup();
  await excelPage.autoFitFirstColumnViaContextMenu();
  await page.waitForTimeout(500);
 
  const cellValue = await excelPage.getCellValueViaClipboard();

  const today = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const todayFormatted = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;

  console.log('Value in cell after =TODAY():', cellValue);
  console.log('Expected today:', todayFormatted);

  await expect(cellValue).toBe(todayFormatted);
});
