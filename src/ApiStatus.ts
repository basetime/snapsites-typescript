/**
 * The results of an api request.
 */
export interface ApiStatus {
  /**
   * The id of the ApiRequest.
   */
  id: string;

  /**
   * The status of the ApiRequest.
   */
  status: string;

  /**
   * The cost of the ApiRequest in centi-credits.
   */
  cost: number;

  /**
   * Number of steps required to scrape the page.
   */
  totalSteps: number;

  /**
   * The current step of the ApiRequest.
   *
   * Can be used with `totalSteps` to calculate the progress of the request.
   */
  currentStep: number;

  /**
   * The images generated during the ApiRequest.
   */
  images: Record<string, string>;

  /**
   * The pdfs generated during the ApiRequest.
   */
  pdfs: Record<string, string>;

  /**
   * The logs generated during the ApiRequest.
   */
  logs: string[];

  /**
   * The body of the request that was initially POSTed to the api.
   */
  request: string;
}
