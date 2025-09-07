import { type Page, type Locator } from '@playwright/test';

export class CalendarPage {
    readonly page: Page;
    
    readonly calendarLink: Locator;
    readonly pageHeader: Locator;

    readonly weekViewButton: Locator;
    readonly monthViewButton: Locator;
    readonly yearViewButton: Locator;

    readonly weekViewData: Locator;
    readonly monthViewData: Locator;
    readonly yearViewData: Locator;

    constructor(page: Page) {
        this.page = page;

        this.calendarLink = page.getByRole('link', { name: 'Calendar' });
        this.pageHeader = page.getByRole('heading', { name: /Calendar/i }); 
        
        this.weekViewButton = page.getByRole('button', { name: 'Week', exact: true });
        this.monthViewButton = page.getByRole('button', { name: 'Month', exact: true });
        this.yearViewButton = page.getByRole('button', { name: 'Year', exact: true });
        
        this.weekViewData = page.locator('div.week-day-cell').first(); 
        this.monthViewData = page.locator('div.month-grid');
        this.yearViewData = page.locator('div.month-card').first(); 
    }

   
    async goto() {
        await this.page.waitForTimeout(500); 
        await this.calendarLink.click();
    }
}