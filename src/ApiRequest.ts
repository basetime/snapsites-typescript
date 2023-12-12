/**
 * Represents a single API request.
 */
export interface ApiRequest {
  /**
   * The URL of the page to take a screenshot of.
   */
  url?: string;

  /**
   * The HTML of the page to take a screenshot of.
   */
  html?: string;

  /**
   * The type of the file to be generated.
   */
  type?: 'jpg' | 'png' | 'pdf';
}
