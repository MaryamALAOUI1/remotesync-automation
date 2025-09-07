import { type Page, type Locator } from '@playwright/test';

export class ReportsPage {
    readonly page: Page;
    readonly reportsLink: Locator;
    readonly pageHeader: Locator;
    readonly createRequestButton: Locator;

    readonly createReportModal: Locator;
    readonly titleInput: Locator;
    readonly reasonInput: Locator; 
    readonly descriptionTextarea: Locator;
    readonly saveButton: Locator;

    readonly notificationToast: Locator;
    readonly validationError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.reportsLink = page.getByRole('link', { name: 'Report' });
        this.pageHeader = page.getByRole('heading', { name: 'Manage Your Reports' });
        this.createRequestButton = page.getByRole('button', { name: 'Create Rotation Request' });

        this.createReportModal = page.getByRole('dialog', { name: 'Create Rotation Request' });
        
        this.titleInput = this.createReportModal.getByRole('textbox', { name: 'Title :' });
        this.reasonInput = this.createReportModal.getByRole('textbox', { name: 'Reason :' }); 
        this.descriptionTextarea = this.createReportModal.getByRole('textbox', { name: 'Description :' });
        this.saveButton = this.createReportModal.getByRole('button', { name: 'Save' });
        
        this.notificationToast = page.locator('div.p-toast-detail');
        this.validationError = page.locator('.p-error').first();
    }
    
    async goto() {
        await this.page.waitForTimeout(500);
        await this.reportsLink.click();
    }

   
    async createValidRequest(title: string, reason: string, description: string) { 
        await this.createRequestButton.click();
        await this.createReportModal.waitFor({ state: 'visible', timeout: 5000 });

        await this.titleInput.fill(title);
        await this.reasonInput.fill(reason); 
        await this.descriptionTextarea.fill(description);

        const responsePromise = this.page.waitForResponse('**/api/v1/user/associate/report/rotation-request');
        await this.saveButton.click();
        await responsePromise;
    }

    
    async createInvalidRequest(title: string) {
        await this.createRequestButton.click();
        await this.createReportModal.waitFor({ state: 'visible', timeout: 5000 });
        await this.titleInput.fill(title);
        await this.saveButton.click();
    }
}