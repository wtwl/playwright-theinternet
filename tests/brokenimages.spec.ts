import test, { expect } from "@playwright/test";
import { BrokenImagesPage } from "../pageobjects/brokenimagespage";


test.describe("", () => {
    test("Should return status OK for images source call", async ({page, request}) => {
        const brokenImagesPage: BrokenImagesPage = new BrokenImagesPage(page);

        await brokenImagesPage.goto();

        const sources = await brokenImagesPage.getImagesSource();

        for (const source of sources) {
            let response = await request.get(source);
            expect.soft(response.ok(),
             `Call to ${source} should return OK status`)
             .toBeTruthy();
        }
    });

    test("Accesebility. Images sould have alt attribute", async ( {page} ) => {
        const brokenImagesPage: BrokenImagesPage = new BrokenImagesPage(page);

        await brokenImagesPage.goto();

        const images = await brokenImagesPage.getImagesElements();
        
        for (let i = 1; i <= await images.count(); i++) {
            await expect.soft(images.nth(i),
             `Image have to have alt attribute`)
             .toHaveAttribute("alt", /.+/, {timeout: 50});
        }
    });




});