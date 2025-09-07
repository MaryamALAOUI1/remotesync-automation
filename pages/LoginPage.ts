import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly notificationToast: Locator;

    constructor(page: Page) {
        this.page = page;
        this.notificationToast = page.locator('p-toast .p-toast-message');
    }

    async goto() {
        await this.page.goto('http://localhost:4200/en/remotesync/login');
    }

async login(username: string, password: string) {
  await this.page.locator('input[name="usernameOrEmail"], input[placeholder*="username"], input[placeholder*="email"]').fill(username);

  const passwordLocator = this.page.locator('p-password[name="password"] input, input[name="password"], input[placeholder*="password"]');
  await passwordLocator.fill(password);

  const [response] = await Promise.all([
    this.page.waitForResponse(resp => resp.url().includes('/api/v1/auth/login') && resp.request().method() === 'POST'),
    this.page.locator('button[type="submit"], button:has-text("Sign In")').click(),
  ]);

  return response;
}



    async setNewPassword(password: string, confirm: string) {
        await this.page.waitForURL('**/set-password**', { timeout: 10000 });

        const newPasswordInput = this.page.locator('p-password[name="newPassword"] input');
        const confirmPasswordInput = this.page.locator('p-password[name="confirmPassword"] input');
        const updateButton = this.page.getByRole('button', { name: /Update Password/i });

        await newPasswordInput.fill(password);
        await confirmPasswordInput.fill(confirm);

        const [response] = await Promise.all([
            this.page.waitForResponse('**/api/v1/auth/set-password'),
            updateButton.click(),
        ]);

        await this.notificationToast.waitFor({ state: 'visible', timeout: 10000 });
    }

    async clickForgotPassword() {
        await this.page.click('a.forgot-password-link');
    }

    async sendResetLink(email: string) {
        await this.page.fill('input[name="email"]', email);

        const [response] = await Promise.all([
            this.page.waitForResponse('**/api/v1/auth/recover-password'),
            this.page.click('button[type="submit"]'),
        ]);

        await this.notificationToast.waitFor({ state: 'visible', timeout: 10000 });
    }

    async isSignInButtonDisabled(): Promise<boolean> {
        return this.page.locator('button[type="submit"]').isDisabled();
    }

    async fillUsername(username: string) {
        await this.page.fill('input[name="usernameOrEmail"]', username);
    }

    async fillPassword(password: string) {
        await this.page.fill('p-password[name="password"] input', password);
    }
}
