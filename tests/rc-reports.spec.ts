// tests/rc-reports.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RcReportsPage } from '../pages/RcReportsPage';

test.describe('RC - Report Management', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let reportsPage: RcReportsPage;

    const managerEmail = 'manager1';
    const managerPassword = 'manager123';
        
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        reportsPage = new RcReportsPage(page);

        await page.goto('/');
        await loginPage.login(managerEmail, managerPassword);
        const isLoaded = await dashboardPage.isLoaded();
        expect(isLoaded, "Login as RC failed, dashboard did not load.").toBeTruthy();
        
        await reportsPage.goto();
    });
        
  test('should approve a pending modification request', async () => {
        await expect(reportsPage.firstPendingReportCard, "No pending reports were found to approve.").toBeVisible();
        await reportsPage.approveFirstPendingReport();

        await expect(reportsPage.notificationToast).toBeVisible();
        
        // FIX: The regular expression is now corrected to match the actual
        // success message "Report updated successfully".
        await expect(reportsPage.notificationToast).toContainText(/Report updated successfully/i);
    });

    test('should reject a pending modification request', async () => {
        await expect(reportsPage.firstPendingReportCard, "No pending reports were found to reject.").toBeVisible();
        await reportsPage.rejectFirstPendingReport();

        await expect(reportsPage.notificationToast).toBeVisible();
        
        // Applying the same fix here for consistency.
        await expect(reportsPage.notificationToast).toContainText(/Report updated successfully/i);
    });
});