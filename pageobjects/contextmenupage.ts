import { Locator, Page } from "@playwright/test";
import { WebPage } from "./webpage";


export class ContextMenuPage extends WebPage {

    private readonly contextArea: Locator;

    constructor(page: Page) {
        super(page);

        this.contextArea = this.page.locator("//div[@id='hot-spot']");
    }

    public async goto() {
        this.page.goto("context_menu");
    }

    public async clickOnHotSpot() {
        await this.contextArea.click();
    }

    public async contextClickOnHotSpot() {
        await this.contextArea.click({button: 'right'});
    }


}