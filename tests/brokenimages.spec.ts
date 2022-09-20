import test, { expect } from "@playwright/test";
import { BrokenImages } from "../pageobjects/brokenimagespage";


test.describe("", () => {

    test("", async ({page, request}) => {
        const brokenImages: BrokenImages = new BrokenImages(page);

        await brokenImages.goto();

        const sources = await brokenImages.getImagesSource();

        for (const source of sources) {
            let response = await request.get(source);
            expect.soft(response.ok()).toBeTruthy();
        }

    })




});