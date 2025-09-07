import { type Page, type Locator, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly languageDropdown: Locator;
    readonly saveChangesButton: Locator;
    readonly notificationToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.usernameInput = page.getByLabel('Username');
        this.emailInput = page.getByLabel('Email');
        this.phoneNumberInput = page.getByLabel('Phone Number');
        this.languageDropdown = page.getByRole('combobox');
        this.saveChangesButton = page.getByRole('button', { name: 'Save changes' });
        this.notificationToast = page.locator('div.p-toast-detail');
    }

    async goto() {
        await this.page.goto('/en/remotesync/associate/profile');
    }

         async updatePhoneNumber(newNumber: string) {
        await this.phoneNumberInput.clear();
        await this.phoneNumberInput.fill(newNumber);
        await expect(this.saveChangesButton).toBeEnabled();
        await this.saveChangesButton.click();
    }

    async switchLanguageTo(languageName: 'French' | 'English' | 'Spanish') {
        await this.languageDropdown.click();
        await this.page.getByRole('option', { name: languageName }).click();
    }
}