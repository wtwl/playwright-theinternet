import test, { expect } from "@playwright/test";
import { EntryAdPage } from "../pageobjects/entryadpage";


test.describe('Entry Ad', () => {


    test("Modal window should appear at first page visit", async ({page}) => {
        const entryAdPage: EntryAdPage = new EntryAdPage(page);

        await entryAdPage.goto();

        const expectedMessage = "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).";

        await expect(entryAdPage.modalWindow).toBeVisible({timeout: 3000});

        await expect(entryAdPage.modalBodyMessage).toHaveText(expectedMessage);

    });

    test("Modal window should not appear after closing modal", async ({page}) => {
        const entryAdPage: EntryAdPage = new EntryAdPage(page);

        const modalTimeout = 1500;

        await entryAdPage.goto();
        
        await entryAdPage.closeModal();

        await expect(entryAdPage.modalWindow)
        .not
        .toBeVisible();

        await page.reload();

        await entryAdPage.closeModal();

        await page.reload();

        await page.waitForTimeout(modalTimeout);

        await expect(entryAdPage.modalWindow)
        .not
        .toBeVisible();
    });


});