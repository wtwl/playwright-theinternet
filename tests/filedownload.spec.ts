import test, { expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { FilesUtils } from "../utils/files";
import FileDownloadPage from "../pageobjects/filedownloadpage";

const resourcePath = path.join(__dirname, "..", "resources", "downloads", "file_download_test");


test.afterAll(() => {
    FilesUtils.removeDirectory(resourcePath);
});

test.only("Should download file by link", async ({page}) => {

    const fileDownloadPage: FileDownloadPage = new FileDownloadPage(page);

    await fileDownloadPage.goto();

    await fileDownloadPage.downloadAllFiles(); 

    fileDownloadPage.actualFileNames.forEach( async link => {
        const filePath = path.join(fileDownloadPage.resourcePath, link);
        
        expect.soft( await FilesUtils.isFileExist(filePath), `${filePath} failed to download`).toBe(true);
    });

});