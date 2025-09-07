import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    }
    
    async isLoaded(): Promise<boolean> {
        try {
            await this.dashboardHeader.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getUserRole() {
        return this.page.textContent('.user-role'); 
    }
}