import { Page } from "@playwright/test";
import { WebPage } from "./webpage";

export class BrokenImagesPage extends WebPage {
    private readonly _imagesLocator: string = "//div[@class='example']//img";

    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("broken_images");
    }

    public async getImagesElements() {
        return this.page.locator(this._imagesLocator);
    }

    public async getImagesSource() {
        const images = await this.page.$$(this._imagesLocator);
        const sources: string[] = [];

        for (const image of images) {
            let source = `${this.BASE_URL}/${await image.getAttribute("src")}`;
            sources.push(source);
        }

        return sources;
    }



}