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
   * The beacon URI of the ApiRequest.
   */
  beaconUri: string;

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
   * Additional results generated by integrations.
   *
   * Integrations typically generate screenshots and pdfs, but they can also
   * generate additional data. For example, a crawler integration may return a
   * list of urls that it crawled.
   *
   * The type of the results is an array with each integration that generated results
   * being pushed onto the array. The order of the integrations is the same order
   * that the integrations were run.
   */
  results: any[];

  /**
   * The body of the request that was initially POSTed to the api.
   */
  request: string;

  /**
   * User supplied metadata that will be a part of the api status.
   *
   * Used by clients to pass along a unique value that they need to associate with the request. They
   * can then find this value in the status response.
   */
  meta?: string;
}
