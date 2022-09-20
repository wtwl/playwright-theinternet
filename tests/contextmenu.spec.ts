import test, { expect } from "@playwright/test";
import { ContextMenuPage } from "../pageobjects/contextmenupage";


test("Should call js dialog", async ({page}) => {

    
    page.on("dialog", async dialog => {
        expect.soft(dialog.type()).toBe("alert");
        expect.soft(dialog.message).toBe("You seleted a context menu");

        await dialog.dismiss();
    });

    const contextMenuPage: ContextMenuPage = new ContextMenuPage(page);
    
    await contextMenuPage.goto();

    await contextMenuPage.contextClickOnHotSpot();
});