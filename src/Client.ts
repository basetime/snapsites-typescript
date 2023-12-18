import axios from 'axios';
import { ScrapeRequest } from './ApiRequest';
import { ApiResponse, BatchApiResponse } from './ApiResponse';
import { ApiStatus } from './ApiStatus';

axios.defaults.baseURL = 'http://dev-api.snapsites.io';

/**
 * Client library that communicates with the Snapsites API.
 */
export class Client {
  /**
   * The default request to use when making a request.
   */
  public static defaultApiRequest: Partial<ScrapeRequest> = {
    browser: 'chromium',
    url: '',
    html: '',
    type: 'jpg',
  };

  /**
   * Constructor
   *
   * @param apiSecret The API secret for the endpoint.
   * @param wait Whether to wait for the request to complete.
   */
  constructor(
    public readonly apiSecret: string,
    public readonly wait: boolean = true,
  ) {}

  /**
   * Takes a screenshot of a page.
   *
   * ```ts
   * const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', {
   *    browser: 'chromium',
   *    url: 'https://avagate.com',
   *    type: 'jpg',
   * });
   * console.log(resp);
   *
   * // {
   * //   id: '7473bbe4-b2bf-4858-9a9c-476d302df5b9',
   * //   time: 11094,
   * //   status: 'https://api.snapsites.io/status/7473bbe4-b2bf-4858-9a9c-476d302df5b9',
   * //   errors: [],
   * //   cost: -0.2,
   * //   balance: 1000,
   * //   images: [
   * //     'https://api.snapsites.io/image/123.jpg'
   * //   ],
   * //   pdfs: []
   * // }
   * ```
   *
   * The response values are as follows:
   *
   *  - `id`: The unique id of the request.
   *  - `time`: Number of milliseconds it took to complete the request.
   *  - `status`: URL to poll in order to get the status of the request.
   *  - `errors`: Any errors that occurred during the request.
   *  - `cost`: The cost of the request in credits.
   *  - `balance`: The remaining balance in credits.
   *  - `images`: The images generated during the request.
   *  - `pdfs`: The pdfs generated during the request.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param req The details of the page to screenshot.
   */
  public screenshot = async (endpoint: string, req: ScrapeRequest): Promise<ApiResponse> => {
    const body = { ...Client.defaultApiRequest, ...req };

    return await this.doRequest<ApiResponse>(
      'POST',
      `/${endpoint}?wait=${this.wait ? '1' : '0'}`,
      body,
    );
  };

  /**
   * Sends a batch of screenshots to be taken.
   *
   * The images/pdfs will be returned in the same order they were listed in the request.
   *
   * ```ts
   * const resp = await client.batchScreenshots('dyNmcmgxd4BFmuffdwCBV0', [
   *    {
   *      browser: 'chromium',
   *      url: 'https://avagate.com',
   *      type: 'jpg',
   *    },
   *    {
   *      browser: 'firefox',
   *      url: 'https://avagate.com',
   *      type: 'jpg',
   *    },
   * ]);
   * console.log(resp);
   *
   * // {
   * //   id: '7473bbe4-b2bf-4858-9a9c-476d302df5b9',
   * //   time: 11094,
   * //   status: 'https://api.snapsites.io/status/7473bbe4-b2bf-4858-9a9c-476d302df5b9',
   * //   errors: [],
   * //   cost: -0.2,
   * //   balance: 1000,
   * //   images: [
   * //     'https://api.snapsites.io/image/123.jpg',
   * //     'https://api.snapsites.io/image/456.jpg',
   * //   ],
   * //   pdfs: []
   * // }
   * ```
   *
   * @param endpoint The ID of the endpoint to use.
   * @param req The details of the page to screenshot.
   */
  public batchScreenshots = async (
    endpoint: string,
    req: ScrapeRequest[],
  ): Promise<BatchApiResponse> => {
    const body: ScrapeRequest[] = [];
    for (let i = 0; i < req.length; i++) {
      body.push({ ...Client.defaultApiRequest, ...req[i] });
    }

    return await this.doRequest<BatchApiResponse>(
      'POST',
      `/${endpoint}/batch?wait=${this.wait ? '1' : '0'}`,
      body,
    );
  };

  /**
   * Gets the status of a request.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiRequest The ID of the request.
   */
  public status = async (endpoint: string, apiRequest: string): Promise<ApiStatus> => {
    return await this.doRequest('GET', `/${endpoint}/status/${apiRequest}`);
  };

  /**
   * Makes a request to the API.
   *
   * @param method The method to use.
   * @param url The URL to request.
   * @param body The body of the request.
   */
  private doRequest = async <T>(method: 'GET' | 'POST', url: string, body?: any): Promise<T> => {
    const opts: any = {
      method,
      url,
      headers: {
        'X-Api-Secret': this.apiSecret,
      },
    };
    if (body) {
      opts.data = body;
    }

    const resp = await axios.request<T>(opts);

    return resp.data;
  };
}
