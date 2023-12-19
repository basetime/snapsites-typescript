/**
 * Represents a single API scrape request.
 */
export interface ScrapeRequest {
    /**
     * The type of browser to use.
     *
     * See the list of available browsers at `AvailableBrowsers`. A real browser will be launched
     * to take the screenshot. This is the type of browser to use.
     */
    browser?: AvailableBrowsers;
    /**
     * The URL of the page to take a screenshot of.
     *
     * Must begin with http:// or https://.
     */
    url?: string;
    /**
     * The HTML of the page to take a screenshot of.
     *
     * Instead of a URL, the html of the page can be provided directly.
     */
    html?: string;
    /**
     * The format of the generated file.
     */
    type?: 'jpg' | 'png' | 'pdf';
    /**
     * Sets the viewport size of the browser.
     *
     * The width and height of the browser when the screenshot is taken. When not specified, the
     * browser will be full screen.
     */
    viewport?: {
        width: number;
        height: number;
    };
    /**
     * Paper size for pdf formats. Defaults to "Letter".
     */
    pdfFormat?: string;
    /**
     * Options that will be passed to the integrations at request time.
     *
     * These values are specific to the integration, but they are sent though the
     * api request in the format:
     *
     * ```json
     * {
     *     "url": "https://example.com",
     *     "type": "png",
     *     "options": {
     *        "GoogleCloudStorage": {
     *          "filename": "example.png"
     *        }
     *     }
     * }
     * ```
     *
     * In the above request, the `options.GoogleCloudStorage` values will be passed to the
     * Google Cloud Storage integration.
     */
    options?: Record<string, any>;
}
/**
 * The types of browsers that can be created.
 */
export type AvailableBrowsers = 'chromium' | 'firefox' | 'webkit' | 'Blackberry PlayBook' | 'Blackberry PlayBook landscape' | 'BlackBerry Z30' | 'BlackBerry Z30 landscape' | 'Galaxy Note 3' | 'Galaxy Note 3 landscape' | 'Galaxy Note II' | 'Galaxy Note II landscape' | 'Galaxy S III' | 'Galaxy S III landscape' | 'Galaxy S5' | 'Galaxy S5 landscape' | 'Galaxy S8' | 'Galaxy S8 landscape' | 'Galaxy S9+' | 'Galaxy S9+ landscape' | 'Galaxy Tab S4' | 'Galaxy Tab S4 landscape' | 'iPad (gen 5)' | 'iPad (gen 5) landscape' | 'iPad (gen 6)' | 'iPad (gen 6) landscape' | 'iPad (gen 7)' | 'iPad (gen 7) landscape' | 'iPad Mini' | 'iPad Mini landscape' | 'iPad Pro 11' | 'iPad Pro 11 landscape' | 'iPhone 6' | 'iPhone 6 landscape' | 'iPhone 6 Plus' | 'iPhone 6 Plus landscape' | 'iPhone 7' | 'iPhone 7 landscape' | 'iPhone 7 Plus' | 'iPhone 7 Plus landscape' | 'iPhone 8' | 'iPhone 8 landscape' | 'iPhone 8 Plus' | 'iPhone 8 Plus landscape' | 'iPhone SE' | 'iPhone SE landscape' | 'iPhone X' | 'iPhone X landscape' | 'iPhone XR' | 'iPhone XR landscape' | 'iPhone 11' | 'iPhone 11 landscape' | 'iPhone 11 Pro' | 'iPhone 11 Pro landscape' | 'iPhone 11 Pro Max' | 'iPhone 11 Pro Max landscape' | 'iPhone 12' | 'iPhone 12 landscape' | 'iPhone 12 Pro' | 'iPhone 12 Pro landscape' | 'iPhone 12 Pro Max' | 'iPhone 12 Pro Max landscape' | 'iPhone 12 Mini' | 'iPhone 12 Mini landscape' | 'iPhone 13' | 'iPhone 13 landscape' | 'iPhone 13 Pro' | 'iPhone 13 Pro landscape' | 'iPhone 13 Pro Max' | 'iPhone 13 Pro Max landscape' | 'iPhone 13 Mini' | 'iPhone 13 Mini landscape' | 'iPhone 14' | 'iPhone 14 landscape' | 'iPhone 14 Plus' | 'iPhone 14 Plus landscape' | 'iPhone 14 Pro' | 'iPhone 14 Pro landscape' | 'iPhone 14 Pro Max' | 'iPhone 14 Pro Max landscape' | 'Kindle Fire HDX' | 'Kindle Fire HDX landscape' | 'LG Optimus L70' | 'LG Optimus L70 landscape' | 'Microsoft Lumia 550' | 'Microsoft Lumia 550 landscape' | 'Microsoft Lumia 950' | 'Microsoft Lumia 950 landscape' | 'Nexus 10' | 'Nexus 10 landscape' | 'Nexus 4' | 'Nexus 4 landscape' | 'Nexus 5' | 'Nexus 5 landscape' | 'Nexus 5X' | 'Nexus 5X landscape' | 'Nexus 6' | 'Nexus 6 landscape' | 'Nexus 6P' | 'Nexus 6P landscape' | 'Nexus 7' | 'Nexus 7 landscape' | 'Nokia Lumia 520' | 'Nokia Lumia 520 landscape' | 'Nokia N9' | 'Nokia N9 landscape' | 'Pixel 2' | 'Pixel 2 landscape' | 'Pixel 2 XL' | 'Pixel 2 XL landscape' | 'Pixel 3' | 'Pixel 3 landscape' | 'Pixel 4' | 'Pixel 4 landscape' | 'Pixel 4a (5G)' | 'Pixel 4a (5G) landscape' | 'Pixel 5' | 'Pixel 5 landscape' | 'Pixel 7' | 'Pixel 7 landscape' | 'Moto G4' | 'Moto G4 landscape' | 'Desktop Chrome HiDPI' | 'Desktop Edge HiDPI' | 'Desktop Firefox HiDPI' | 'Desktop Safari' | 'Desktop Chrome' | 'Desktop Edge' | 'Desktop Firefox';
