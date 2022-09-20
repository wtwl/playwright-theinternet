import { expect, Locator, Page } from "@playwright/test";

export class WebPage {
    protected readonly BASE_URL = "https://the-internet.herokuapp.com";
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    public async isElementExist(pageLocator: Locator) {
        return (await pageLocator.count()) > 0;
    }
}