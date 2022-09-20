import { Locator, Page,  } from "@playwright/test";
import { WebPage } from "./webpage";


export class SecuredPage extends WebPage {

    private readonly _flashMessage: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this._flashMessage = page.locator("//div[@id='flash']");
        this.logoutButton = page.locator("//a[@href='/logout']");
    }

    get flashMessage() { return this._flashMessage } 

    public async clickLogoutButton() {
        await this.logoutButton.click();
    }

}