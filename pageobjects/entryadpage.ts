import { Locator, Page } from "@playwright/test";
import { WebPage } from "./webpage";

export class EntryAdPage extends WebPage {

    // Modal
    private readonly _modalWindow: Locator;


    private readonly _modalBodyMessage: Locator;

    public get modalBodyMessage(): Locator {
        return this._modalBodyMessage;
    }

    public get modalWindow(): Locator {
        return this._modalWindow;
    }

    private readonly modalWindowCloseButton: Locator;

    private readonly resetAdButton: Locator;


    constructor(page: Page) {
        super(page);

        this._modalWindow = page.locator("//div[@class='modal']");
        this._modalBodyMessage = page.locator("//div[@class='modal-body']");
        this.modalWindowCloseButton = page.locator("//div[@class='modal-footer']/p");

        this.resetAdButton = page.locator("//a[@id='restart-id']");
    }

    public async goto() {
        this.page.goto('entry_ad');
    }

    public async closeModal() {
        await this.modalWindowCloseButton.click();
    }

    public async resetAd() {
        await this.resetAdButton.click();
    }




}