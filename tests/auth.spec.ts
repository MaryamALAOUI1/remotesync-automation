import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Authentication flows', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  const activeUserEmail = 'fatima.bennani@remotesync.com';
  const activeUserPassword = 'user123';
  const disabledUserEmail = 'amine.berrada@remotesync.com'; 
  const disabledUserPassword = 'user123';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('http://localhost:4200/en/remotesync/login');
  });

  test('Positive login - normal user', async () => {
    await loginPage.login('employee', 'employee123');
        expect(await dashboardPage.isLoaded()).toBeTruthy(); 
  });

  test('Positive login - manager user', async () => {
    await loginPage.login('manager1', 'manager123');
    expect(await dashboardPage.isLoaded()).toBeTruthy();
  });
  
  test('Login with nonexistent account shows error toast', async () => {
    await loginPage.login('no.such@remotesync.com', 'whatever');
    await expect(loginPage.notificationToast).toContainText(/Invalid credentials|Login Failed|No account found/i);
  });
  
  test('Login with disabled account shows disabled error', async () => {
    await loginPage.login(disabledUserEmail, disabledUserPassword);
    await expect(loginPage.notificationToast).toContainText(/disabled/i);
  });
  
  test('Sign in button disabled when fields empty and enabled when filled', async () => {
    expect(await loginPage.isSignInButtonDisabled()).toBeTruthy();
    await loginPage.fillUsername(activeUserEmail);
    expect(await loginPage.isSignInButtonDisabled()).toBeTruthy();
    await loginPage.fillPassword(activeUserPassword);
    expect(await loginPage.isSignInButtonDisabled()).toBeFalsy();
  });

test('Login with wrong password shows error toast', async () => {
await loginPage.login('fatima.bennani@remotesync.com', 'wrong');
    await expect(loginPage.notificationToast).toContainText(/Invalid credentials|Validation failed|Bad credentials/i);
  });

test('Forgot password: non rxisting user', async () => {
    await loginPage.clickForgotPassword();
    await loginPage.sendResetLink('wxc@aze.com');

    await expect(loginPage.notificationToast).toBeVisible({ timeout: 10000 });
    await expect(loginPage.notificationToast).toContainText(/User not found with email/i);
});
// Skipping due to bug RSYNC-BUG-001
  test.skip('Forgot password: existing user receives reset link toast', async () => {
    await loginPage.clickForgotPassword();
    await loginPage.sendResetLink(activeUserEmail);

    await expect(loginPage.notificationToast).toBeVisible({ timeout: 10000 });
    await expect(loginPage.notificationToast).toContainText(/reset link has been sent/i);
});



});
