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
   * The API secret created when the endpoint was created.
   */
  public apiSecret: string;

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
   */
  constructor(apiSecret: string) {
    this.apiSecret = apiSecret;
  }

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
    const resp = await axios.post<ApiResponse>(`/${endpoint}`, body, {
      headers: {
        'X-Api-Secret': this.apiSecret,
      },
    });

    return resp.data;
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

    const resp = await axios.post<BatchApiResponse>(`/${endpoint}`, body, {
      headers: {
        'X-Api-Secret': this.apiSecret,
      },
    });

    return resp.data;
  };

  /**
   * Gets the status of a request.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiRequest The ID of the request.
   */
  public status = async (endpoint: string, apiRequest: string): Promise<ApiStatus> => {
    const resp = await axios.get<ApiStatus>(`/${endpoint}/status/${apiRequest}`, {
      headers: {
        'X-Api-Secret': this.apiSecret,
      },
    });

    return resp.data;
  };
}
