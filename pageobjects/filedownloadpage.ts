import { Locator, Page } from "@playwright/test";
import { WebPage} from "./webpage";

import path from "path";


export default class FileDownloadPage extends WebPage {

    private readonly downloadLinks: Locator;

    private readonly _actualFileNames: string[] = [];

    private readonly _resourcePath = path.join(__dirname, "..", "resources", "downloads", "file_download_test");

    public get actualFileNames(): string[] {
        return this._actualFileNames;
    }
    
    public get resourcePath() {
        return this._resourcePath;
    }

    constructor(page: Page) {
        super(page);

        this.downloadLinks = page.locator("#content a");
    }

    public async goto() {
        await this.page.goto("download");
    }

    public async clickLink(linkPosition: number) {
        await this.downloadLinks.nth(linkPosition).click();
    }

    public async downloadAllFiles() {
        for (let i = 0; i < await this.downloadLinks.count(); i++) {
            const linkText = await this.downloadLinks.nth(i).textContent() as string;
            if (linkText == "?.png") continue;
            this._actualFileNames.push(linkText);
            
            const [download] = await Promise.all([
                this.page.waitForEvent("download"),

                this.clickLink(i)
            ]);

            await download.saveAs(path.join(this._resourcePath, linkText));
        }
    }

}