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
    meta: '',
  };

  /**
   * Takes a screenshot of a page.
   *
   * ```ts
   * const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', '123', {
   *    browser: 'chromium',
   *    url: 'https://avagate.com',
   *    type: 'jpg',
   * });
   * ```
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiSecret The API secret for the endpoint.
   * @param req The details of the page to screenshot.
   */
  public screenshot = async (
    endpoint: string,
    apiSecret: string,
    req: ScrapeRequest,
  ): Promise<ApiResponse> => {
    const body = { ...Client.defaultApiRequest, ...req };

    return await this.doRequest<ApiResponse>('POST', `/${endpoint}?wait=0`, apiSecret, body);
  };

  /**
   * Sends a screenshot request to snapsites and waits for snapsites to finish generating
   * the screenshots before returning.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiSecret The API secret for the endpoint.
   * @param req The details of the page to screenshot.
   */
  public screenshotWait = async (
    endpoint: string,
    apiSecret: string,
    req: ScrapeRequest,
  ): Promise<ApiResponse> => {
    const body = { ...Client.defaultApiRequest, ...req };

    return await this.doRequest<ApiResponse>('POST', `/${endpoint}?wait=1`, apiSecret, body);
  };

  /**
   * Sends a batch of screenshots to be taken.
   *
   * The images/pdfs will be returned in the same order they were listed in the request.
   *
   * ```ts
   * const resp = await client.batchScreenshots('dyNmcmgxd4BFmuffdwCBV0', '123', [
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
   * @param apiSecret The API secret for the endpoint.
   * @param req The details of the page to screenshot.
   */
  public batchScreenshots = async (
    endpoint: string,
    apiSecret: string,
    req: ScrapeRequest[],
  ): Promise<ApiResponseSimple> => {
    const body: ScrapeRequest[] = [];
    for (let i = 0; i < req.length; i++) {
      body.push({ ...Client.defaultApiRequest, ...req[i] });
    }

    return await this.doRequest<ApiResponseSimple>('POST', `/${endpoint}?wait=0`, apiSecret, body);
  };

  /**
   * Sends a batch of screenshots to be taken and waits for snapsites to finish generating
   * the screenshots before returning.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiSecret The API secret for the endpoint.
   * @param req The details of the page to screenshot.
   */
  public batchScreenshotsWait = async (
    endpoint: string,
    apiSecret: string,
    req: ScrapeRequest[],
  ): Promise<ApiResponseSimple> => {
    const body: ScrapeRequest[] = [];
    for (let i = 0; i < req.length; i++) {
      body.push({ ...Client.defaultApiRequest, ...req[i] });
    }

    return await this.doRequest<ApiResponseSimple>('POST', `/${endpoint}?wait=1`, apiSecret, body);
  };

  /**
   * Gets the status of a request.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiSecret The API secret for the endpoint.
   * @param apiRequest The ID of the request.
   */
  public status = async (
    endpoint: string,
    apiSecret: string,
    apiRequest: string,
  ): Promise<ApiStatus> => {
    return await this.doRequest('GET', `/${endpoint}/status/${apiRequest}`, apiSecret);
  };

  /**
   * Returns the status of all ApiRequests for an endpoint.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param apiSecret The API secret for the endpoint.
   * @param limit The maximum number of requests to return.
   * @param offset The offset to start at.
   */
  public statusAll = async (
    endpoint: string,
    apiSecret: string,
    limit = 25,
    offset = 0,
  ): Promise<Omit<ApiStatus, 'logs' | 'request'>[]> => {
    return await this.doRequest(
      'GET',
      `/${endpoint}/status?limit=${limit}&offset=${offset}`,
      apiSecret,
    );
  };

  /**
   * Listens for beacon updates.
   *
   * ```ts
   * const client = new Client();
   * const resp = await client.screenshot(endpointId, '123', {
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
   * @param apiSecret The API secret for the endpoint.
   * @param body The body of the request.
   */
  private doRequest = async <T>(
    method: 'GET' | 'POST',
    url: string,
    apiSecret: string,
    body?: any,
  ): Promise<T> => {
    const opts: any = {
      method,
      url,
      headers: {
        'X-Api-Secret': apiSecret,
      },
    };
    if (body) {
      opts.data = body;
    }

    const resp = await axios.request<T>(opts);

    return resp.data;
  };
}
