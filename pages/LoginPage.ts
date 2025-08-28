import { Page, expect } from '@playwright/test';
import { credentials } from '../config/credentials';

export class LoginPage {
  constructor(private page: Page) { }

  async goto() {
    await this.page.goto(credentials.url);
    await expect(this.page.locator('text=Sign in')).toBeVisible();
    await this.page.click('text=Sign in');
  }

  async login() {

    const emailInput = this.page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await this.page.click('input[type="submit"]');

    const passwordOption = this.page.getByRole('button', { name: 'Use your password' });
    await expect(passwordOption).toBeVisible();
    await passwordOption.click();

    const passwordInput = this.page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(credentials.password);
    await this.page.locator('button[data-testid="primaryButton"]').click();

    const staySignedInNo = this.page.locator('button[data-testid="secondaryButton"]');
    await expect(staySignedInNo).toBeVisible();
    await staySignedInNo.click();

  }
}
