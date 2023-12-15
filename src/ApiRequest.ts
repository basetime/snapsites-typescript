/**
 * The types of browsers that can be created.
 */
export type AvailableBrowsers = 'chromium' | 'firefox' | 'webkit';

/**
 * Represents a single API scrape request.
 */
export interface ScrapeRequest {
  /**
   * The type of browser to use.
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
 * Represents a batch of API scrape requests.
 */
export type BatchScrapeRequest = ScrapeRequest[];
