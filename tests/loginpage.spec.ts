import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageobjects/loginpage";
import { SecuredPage } from "../pageobjects/securedpage";
import { FilesUtils } from "../utils/files";

const loginData = FilesUtils.readCSV("login_data.csv");

test.describe("Test login page", () => {
    test("Success login with valid credential", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        const securedPage: SecuredPage = new SecuredPage(page);

        await loginPage.goto();

        await loginPage.login();

        expect(await loginPage.isElementExist(loginPage.loginForm))
        .toBe(false);

        await expect(securedPage.flashMessage)
        .toContainText(
            "You logged into a secure area!"
        );
    });

    test("Return to Login page after logging out", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        const securedPage: SecuredPage = new SecuredPage(page);

        await loginPage.goto();

        await loginPage.login();

        await securedPage.clickLogoutButton();

        await expect(loginPage.flashMessage)
        .toContainText(
            "You logged out of the secure area!"
        );

        await expect(loginPage.loginForm).toBeVisible();
    });

    for (const login of loginData) {
        test(`Test login with ${login["login type"]}`, async ({ page }) => {
            const loginPage: LoginPage = new LoginPage(page);

            await loginPage.goto();

            await loginPage.login(login.username, login.password);

            await expect(loginPage.flashMessage)
            .toContainText(login.message);
        });
    }
});
