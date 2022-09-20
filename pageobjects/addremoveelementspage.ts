import { Locator, Page } from "@playwright/test";
import { WebPage } from "./webpage";

export class AddRemoveElementsPage extends WebPage {

    private readonly addElementButton: Locator;
    private readonly _deleteButton: Locator;

    public get deleteButton(): Locator {
        return this._deleteButton;
    }

    constructor(page: Page) {
        super(page);

        this.addElementButton = page.locator("//button[.='Add Element']");
        this._deleteButton = page.locator("//button[.='Delete']");
    }

    public async goto() {
        await this.page.goto("add_remove_elements/");
    }

    public async addElement() {
        await this.addElementButton.click();
    }

    public async addElements(numberOfElementsToAdd: number) {
        for (let i = 0; i < numberOfElementsToAdd; i++) {
            await this.addElement();
        }
    }

    public async deleteElements(numberOfElementsToDelete: number) {
        for (let i = 0; i < numberOfElementsToDelete; i++) {
            await this.deleteButton.first().click();
        }
    }

}