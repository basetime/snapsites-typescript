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

/**
 * Represents a batch of API requests.
 *
 * The keys will be used to identify the generated files. The values are the
 * ApiRequest to use for the request.
 */
export interface BatchApiRequest {
  [key: string]: ApiRequest;
}
