// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
            slowMo: 0,
        },
        screenshots: 'off',
    },
};

module.exports = config;