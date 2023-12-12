/**
 * Response returned to the client for batch requests.
 */
export interface BatchApiResponse {
  /**
   * The unique id of the request.
   *
   * The id of the ApiRequest that was created for this request.
   */
  id: string;

  /**
   * The status url of the request.
   *
   * The current JobStatus of this request.
   */
  status: string;

  /**
   * The cost of the request in centi-credits.
   */
  cost: number;

  /**
   * The remaining balance in centi-credits.
   */
  balance: number;

  /**
   * Number of milliseconds it took to complete the request.
   */
  time: number;
}

/**
 * Response returned to the client.
 */
export interface ApiResponse extends BatchApiResponse {
  /**
   * The images generated during the ApiRequest.
   *
   * Only included in the response when the request contained only a single page to scrape.
   */
  images?: string[];

  /**
   * The pdfs generated during the ApiRequest.
   *
   * Only included in the response when the request contained only a single page to scrape.
   */
  pdfs?: string[];
}
