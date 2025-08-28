import { Page, FrameLocator, expect } from '@playwright/test';

export class ExcelPage {
  private excelPage: Page | undefined;
  private frame!: FrameLocator;

  private readonly excelTabSelector = '//span[text()="Excel"]';
  private readonly newWorkbookButtonSelector = 'button[data-testid="0300"]';
  private readonly sheetCanvasSelector = 'canvas.ewr-sheettable';

  constructor(private page: Page) { }

  async openExcel(): Promise<void> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator(this.excelTabSelector).click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    this.excelPage = newPage;

    this.frame = this.excelPage.frameLocator('iframe[title="Office on the web Frame"]');
  }

  async createNewWorkbook(): Promise<void> {
    if (!this.excelPage) throw new Error('Excel page not initialized');

    const newWorkbookButton = this.excelPage.locator(this.newWorkbookButtonSelector);
    await expect(newWorkbookButton).toBeVisible({ timeout: 20000 });
    await newWorkbookButton.click();

    const sheetCanvas = this.frame.locator(this.sheetCanvasSelector).first();
    await expect(sheetCanvas).toBeVisible({ timeout: 20000 });
  }

  async enterTodayFormula(): Promise<void> {
    if (!this.excelPage) throw new Error('Excel page not initialized');

    const sheetCanvas = this.frame.locator(this.sheetCanvasSelector).first();

    await sheetCanvas.click();
    await this.excelPage.keyboard.press('Control+Home');

    await this.excelPage.keyboard.type('=TODAY()');
    await this.excelPage.keyboard.press('Enter');

    await this.excelPage.waitForTimeout(1000);
  }

  async closePopup(): Promise<void> {
    if (!this.excelPage) throw new Error('Excel page not initialized');
    const frame = this.frame;
    const closeBtn = frame.locator('button[aria-label="Close"], button[title="Close"], button:has-text("Close")');
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      await this.excelPage.waitForTimeout(500);
    }
  }

  async autoFitFirstColumnViaContextMenu(): Promise<void> {
    if (!this.excelPage) throw new Error('Excel page not initialized');
    const canvas = this.frame.locator(this.sheetCanvasSelector).first();
    await canvas.click({
      button: 'right',
      position: { x: 55, y: 20 },
    });

    const columnWidthOption = this.frame.getByText('Column Width');
    await columnWidthOption.click();

    const autoFitOption = this.frame.getByText('AutoFit');
    await autoFitOption.click();

    await this.excelPage.waitForTimeout(500);
  }


  async getCellValueViaClipboard(maxRetries = 5): Promise<string> {
    if (!this.excelPage) throw new Error('Excel page not initialized');

    const sheetCanvas = this.frame.locator(this.sheetCanvasSelector).first();

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      await sheetCanvas.click();
      await this.excelPage.keyboard.press('Control+Home');

      const copyKey = process.platform === 'darwin' ? 'Meta+C' : 'Control+C';
      await this.excelPage.keyboard.press(copyKey);

      const clipboardText = await this.excelPage.evaluate(() => navigator.clipboard.readText());

      const text = clipboardText.trim();
      if (this.isValidDateString(text)) {
        return text;
      }

      console.log(`Attempt ${attempt} failed, retrying in 1s...`);
      await this.excelPage.waitForTimeout(1000);
    }

    throw new Error('Failed to read valid cell value from clipboard after multiple attempts.');
  }

  private isValidDateString(dateStr: string): boolean {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);
    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === (month - 1) && date.getDate() === day;
  }
}
