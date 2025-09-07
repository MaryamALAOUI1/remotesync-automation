import { type Page, type Locator } from '@playwright/test';

export class RcReportsPage {
    readonly page: Page;
    readonly reportLink: Locator;
    readonly pageHeader: Locator;
    readonly firstPendingReportCard: Locator;
    readonly viewReportButton: Locator;
    readonly updateReportDialog: Locator;
    readonly approveButton: Locator; 
    readonly rejectButton: Locator;
    readonly notificationToast: Locator;

    constructor(page: Page) {
        this.page = page;

        this.reportLink = page.getByRole('link', { name: 'Report' });
        this.pageHeader = page.getByRole('heading', { name: 'Reports' });
        this.firstPendingReportCard = page.locator('.report-card:has-text("Pending")').first();
        this.viewReportButton = this.firstPendingReportCard.getByRole('button', { name: 'View Report' });

        this.updateReportDialog = page.getByRole('dialog'); 
        
        this.approveButton = this.updateReportDialog.getByRole('button', { name: /Accept/i });
        this.rejectButton = this.updateReportDialog.getByRole('button', { name: /Reject/i });
        
        this.notificationToast = page.locator('p-toastitem');
    }
    
    async goto() {
        await this.page.waitForTimeout(500); 
        await this.reportLink.click();
        await this.pageHeader.waitFor({ state: 'visible' });
    }
    
    async approveFirstPendingReport() {
        await this.viewReportButton.click();
        
        await this.updateReportDialog.waitFor({ state: 'visible' });

        const responsePromise = this.page.waitForResponse('**/api/v1/user/rc/reports/update');
        await this.approveButton.click();
        await responsePromise;
    }

    async rejectFirstPendingReport() {
        await this.viewReportButton.click();
        await this.updateReportDialog.waitFor({ state: 'visible' });

        const responsePromise = this.page.waitForResponse('**/api/v1/user/rc/reports/update');
        await this.rejectButton.click();
        await responsePromise;
    }
}