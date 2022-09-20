import test, { expect } from "@playwright/test";
import { AddRemoveElementsPage } from "../pageobjects/addremoveelementspage";
import { FilesUtils } from "../utils/files";

const records = FilesUtils.readCSV("add_remove_elements_data.csv");

test.describe("Add remove elements", () => {
    for (const record of records) {

        test(`Should add ${record["expected elements count"]} elements after adding ${record["elements to add"]} elements and deleting ${record["elements to delete"]} elements`,

         async ({ page }) =>
        {
            const addRemoveElementsPage: AddRemoveElementsPage =
                new AddRemoveElementsPage(page);

            await addRemoveElementsPage.goto();

            await addRemoveElementsPage.addElements(record["elements to add"]);

            await addRemoveElementsPage.deleteElements(record["elements to delete"]);

            await expect(addRemoveElementsPage.deleteButton).toHaveCount(+record["expected elements count"]);
        });
    }
});
