import { Page, expect } from '@playwright/test';
import { credentials } from '../config/credentials';

export class LoginPage {
  constructor(private page: Page) { }

  async goto() {
    await this.page.goto(credentials.url);
    await expect(this.page.getByRole('link', { name: 'Sign in to your account' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Sign in to your account' }).click();
  }

  async login() {
    const emailInput = this.page.getByRole('textbox', { name: 'Enter your email, phone, or' });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await this.page.getByRole('button', { name: 'Next' }).click();

    const passwordOption = this.page.getByRole('button', { name: 'Use your password' });
    await expect(passwordOption).toBeVisible();
    await passwordOption.click();

    const passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(credentials.password);

    await this.page.getByTestId('primaryButton').click();

    const staySignedInNo = this.page.getByTestId('secondaryButton');
    await expect(staySignedInNo).toBeVisible();
    await staySignedInNo.click();
  }
}
