import { Locator, Page } from '@playwright/test';
import { WebPage } from './webpage';


type Button = "Remove" | "Add" | "Disable" | "Enable";

export class DynamicElementsPage extends WebPage {
    private readonly _checkbox: Locator;
    public get checkbox(): Locator {
        return this._checkbox;
    }
    private readonly _input: Locator;
    public get input(): Locator {
        return this._input;
    }
    private readonly _checkboxLoader: Locator;

    private readonly inputLoader: Locator;
    private readonly _checkboxMessage: Locator;
    public get checkboxMessage(): Locator {
        return this._checkboxMessage;
    }
    private readonly _inputMessage: Locator;
    public get inputMessage(): Locator {
        return this._inputMessage;
    }
  
    public get checkboxLoader(): Locator {
        return this._checkboxLoader;
    }

    constructor(page: Page) {
        super(page);

        
        this._checkbox = page.locator("#checkbox");
        this._input = page.locator("#input-example input");
        this._checkboxLoader = page.locator("#checkbox-example #loading");
        this.inputLoader = page.locator("#input-example #loading");
        this._checkboxMessage = page.locator("#checkbox-example #message");
        this._inputMessage = page.locator("#input-example #message");
    }

    public async goto() {
        this.page.goto("dynamic_controls");
    }

    private getButton(buttonName: Button) {
        return this.page.locator(`//button[.="${buttonName}"]`);
    }

    public async clickActionButton(buttonName: Button) {
        await this.getButton(buttonName).click();
    }

    public async removeCheckbox() {
        await this.clickActionButton("Remove");
        await this.checkboxLoader.nth(1).waitFor({state: "hidden"});
    }

    public async addCheckbox() {
        await this.clickActionButton("Add");
        await this.checkboxLoader.nth(1).waitFor({state: "hidden"});
    }

    public async markCheckbox() {
        await this.checkbox.check();
    }

    public async enableInput() {
        await this.clickActionButton("Enable");
        await this.inputLoader.nth(1).waitFor({state: "hidden"});
    }

    public async disableInput() {
        await this.clickActionButton("Disable");
        await this.inputLoader.nth(1).waitFor({state: "hidden"});
    }

    public async fillInput(value: string) {
        await this.input.fill(value);
    } 

}