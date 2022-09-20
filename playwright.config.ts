import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'https://the-internet.herokuapp.com',
        headless: false,
    }
}
export default config;

