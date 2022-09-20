import { Locator, Page } from "@playwright/test";
import { WebPage } from "./webpage";

export class LoginPage extends WebPage {
    private readonly _loginForm: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly _flashMessage: Locator;

    constructor(page: Page) {
        super(page);

        this._loginForm = page.locator("//form[@id='login']");
        this.usernameInput = page.locator("//input[@id='username']");
        this.passwordInput = page.locator("//input[@id='password']");
        this.loginButton = page.locator("//button[@type='submit']");
        this._flashMessage = page.locator("//div[@id='flash']");
    }

    public get loginForm () { return this._loginForm };

    public get flashMessage () { return this._flashMessage };

    public async goto() {
        await this.page.goto("login");
    }

    public async fillUsername(username: string) {
        await this.usernameInput.type(username);
    }

    public async fillPassword(password: string) {
        await this.passwordInput.type(password);
    }

    public async fillCredentials(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
    }

    public async clickLoginButton() {
        await this.loginButton.click();
    }

    public async login(
        username: string = "tomsmith",
        password: string = "SuperSecretPassword!"
    ) {
        await this.fillCredentials(username, password);
        await this.clickLoginButton();
    }


}
