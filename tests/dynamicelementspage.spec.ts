import test, { expect } from "@playwright/test";
import { DynamicElementsPage } from "../pageobjects/dynamicelementspage";


test.describe("Dynamic elements", () => {

    /**
     * 
     * - Clicks Remove button to hide checkbox
     * - Checks for hiding message
     * - Click Add button to add checkobox
     * - Checks for add message
     *  
     */    
    test("Should add and remove checkbox after click the button", async ({page}) => {

        const dynamicElementsPage: DynamicElementsPage = new DynamicElementsPage(page);
        
        await dynamicElementsPage.goto();

        await dynamicElementsPage.removeCheckbox();

        await expect(dynamicElementsPage.checkboxMessage).toHaveText("It's gone!");

        await dynamicElementsPage.addCheckbox();

        await expect(dynamicElementsPage.checkbox).toBeVisible();

        await expect(dynamicElementsPage.checkboxMessage).toHaveText("It's back!");

    });



    /**
     * 
     * - Clicks Enable button to enable input field
     * - Checks for enabling message
     * - Fills input with value and checks input for given value
     * - Clicks Disable button to disable input field
     * - Checks for disabling message
     * - Checks that disabled input have given value
     */
    test("Should enable and disable input", async ({page}) => {
        const dynamicElementsPage: DynamicElementsPage = new DynamicElementsPage(page);
        
        await dynamicElementsPage.goto();

        await dynamicElementsPage.enableInput();

        await expect(dynamicElementsPage.inputMessage).toHaveText("It's enabled!");

        await dynamicElementsPage.fillInput("test message");

        await expect(dynamicElementsPage.input).toHaveValue("test message");

        await dynamicElementsPage.disableInput();

        await expect(dynamicElementsPage.input).toBeDisabled();

        await expect(dynamicElementsPage.inputMessage).toHaveText("It's disabled!");

        await expect(dynamicElementsPage.input).toHaveValue("test message");

    });

});