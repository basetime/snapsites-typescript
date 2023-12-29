import axios from 'axios';
import { Unsubscribe, onValue, ref } from 'firebase/database';
import { ScrapeRequest } from './ApiRequest';
import { ApiResponse, ApiResponseSimple } from './ApiResponse';
import { ApiStatus } from './ApiStatus';
import { Beacon } from './Beacon';
import { getRealtimeDatabase } from './firebase';

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
   * ```
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
   * ```
   *
   * @param endpoint The ID of the endpoint to use.
   * @param req The details of the page to screenshot.
   */
  public batchScreenshots = async (
    endpoint: string,
    req: ScrapeRequest[],
  ): Promise<ApiResponseSimple> => {
    const body: ScrapeRequest[] = [];
    for (let i = 0; i < req.length; i++) {
      body.push({ ...Client.defaultApiRequest, ...req[i] });
    }

    return await this.doRequest<ApiResponseSimple>(
      'POST',
      `/${endpoint}?wait=${this.wait ? '1' : '0'}`,
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
   * Listens for beacon updates.
   *
   * ```ts
   * const client = new Client(apiSecret, false);
   * const resp = await client.screenshot(endpointId, {
   *     browser: 'chromium',
   *     url: 'https://avagate.com',
   *     type: 'jpg',
   * });
   *
   * const unsubscribe = client.onBeacon(resp, (beacon) => {
   *     console.log(beacon);
   *     if (beacon.status !== 'running') {
   *        unsubscribe();
   *     }
   * });
   * ```
   *
   * @param beaconUri The beacon URI to listen to.
   * @param on The callback to call when the beacon is updated.
   */
  public onBeacon = (
    beaconUri: string | { beaconUri: string },
    on: (beacons: Beacon[]) => void,
  ): Unsubscribe => {
    const db = getRealtimeDatabase();
    const beaconRef = ref(db, typeof beaconUri === 'string' ? beaconUri : beaconUri.beaconUri);
    return onValue(beaconRef, (snapshot) => {
      on(snapshot.val() as Beacon[]);
    });
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
