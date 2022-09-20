import { Page } from "@playwright/test";
import { WebPage } from "./webpage";

export class BrokenImages extends WebPage {
    private readonly imagesLocator: string = "//div[@class='example']//img";

    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("broken_images");
    }

    public async getImagesSource() {
        const images = await this.page.$$(this.imagesLocator);
        const sources: string[] = [];

        for (const image of images) {
            let source = `${this.BASE_URL}/${await image.getAttribute("src")}`;
            sources.push(source);
        }

        return sources;
    }



}