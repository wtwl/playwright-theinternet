import { Page } from '@playwright/test';
import { WebPage } from './webpage';


export class DynamicElementsPage extends WebPage {

    constructor(page: Page) {
        super(page);

    }

    public async goto() {
        this.page.goto("dynamic_controls");
    }

    private getButton(buttonName: string) {
        return this.page.locator(`//button[.=${buttonName}]`);
    }

    public async clickActionButton(buttonName: string) {
        await this.getButton(buttonName).click();
    }

}