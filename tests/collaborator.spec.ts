import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CalendarPage } from '../pages/CalendarPage';
import { ReportsPage } from '../pages/ReportsPage';

test.describe('Collaborator Role User Journeys', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let calendarPage: CalendarPage;
    let reportsPage: ReportsPage;

    const collaboratorEmail = 'fatima.bennani@remotesync.com';
    const collaboratorPassword = 'user123';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        calendarPage = new CalendarPage(page);
        reportsPage = new ReportsPage(page);

        await page.goto('/');
        await loginPage.login(collaboratorEmail, collaboratorPassword);
        
        const isLoaded = await dashboardPage.isLoaded();
        expect(isLoaded, "Login as collaborator failed, dashboard did not load.").toBeTruthy();
    });

    test('should view and switch between calendar views', async () => {
        await calendarPage.goto();
        await expect(calendarPage.pageHeader).toBeVisible();
        await expect(calendarPage.yearViewData).toBeVisible();
        await calendarPage.monthViewButton.click();
        await expect(calendarPage.monthViewData).toBeVisible();
    });

    test('should successfully submit a valid modification request', async () => {
        await reportsPage.goto();

        const requestDetails = {
            title: 'Request: Doctor Appointment',
            reason: 'Health issues', 
            description: 'I need to shift my on-site day due to a scheduled appointment.'
        };

        await reportsPage.createValidRequest(
            requestDetails.title,
            requestDetails.reason, 
            requestDetails.description
        );

        await expect(reportsPage.notificationToast).toBeVisible();
        await expect(reportsPage.notificationToast).toContainText(/Your report has been submitted successfully/i);
    });

    test('should block submission of a request with missing fields', async () => {
        await reportsPage.goto();
        await reportsPage.createInvalidRequest('Incomplete Request Title');

        await expect(reportsPage.validationError).toBeVisible();
        await expect(reportsPage.validationError).toContainText(/field is required/i);
        await expect(reportsPage.titleInput).toBeVisible();
    });
});