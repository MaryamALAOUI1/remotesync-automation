import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { DashboardPage } from '../pages/DashboardPage'; 

test.describe('User Profile and Settings', () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let dashboardPage: DashboardPage; 

    const userEmail = 'fatima.bennani@remotesync.com'; 
    const userPassword = 'user123';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        dashboardPage = new DashboardPage(page); 
        await page.goto('/');
        await loginPage.login(userEmail, userPassword);
        
        await expect(await dashboardPage.isLoaded(), "Login failed: Dashboard did not load.").toBeTruthy();
        await profilePage.goto();
    });

    test('should display user information in readonly fields', async () => {
        await expect(profilePage.firstNameInput).toBeVisible({ timeout: 10000 });

        await expect(profilePage.usernameInput).not.toBeEditable();
        await expect(profilePage.emailInput).not.toBeEditable();
        
        await expect(profilePage.firstNameInput).toHaveValue('Fatima');
        await expect(profilePage.lastNameInput).toHaveValue('Bennani');
    });

    test('should successfully update the phone number with valid data', async ({ page }) => {
        const newPhoneNumber = '+1 5581707838';
        
        await profilePage.updatePhoneNumber(newPhoneNumber);
        
        await expect(profilePage.notificationToast).toBeVisible();
        await expect(profilePage.notificationToast).toContainText(/profile.*updated|changes have been saved/i);
        
        await page.reload();
        
        await expect(profilePage.phoneNumberInput).toHaveValue(newPhoneNumber);
    });

    test('should show an error when updating with an invalid phone number', async () => {
        const invalidPhoneNumber = 'this-is-not-a-number';
        
        await profilePage.updatePhoneNumber(invalidPhoneNumber);

        await expect(profilePage.notificationToast).toBeVisible();
        await expect(profilePage.notificationToast).toContainText(/phone number format is invalid|validation failed|Invalid phone number/i);
    });

    test('should switch the UI language and persist the change', async () => {
        await expect(profilePage.saveChangesButton).toHaveText('Save changes');

        await profilePage.switchLanguageTo('French');
        
        const saveButtonFrench = profilePage.page.getByRole('button', { name: 'Enregistrer les modifications' });
        await expect(saveButtonFrench).toBeVisible();
    });
});