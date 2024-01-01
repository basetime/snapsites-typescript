import { Unsubscribe } from 'firebase/database';
import { ScrapeRequest } from './ApiRequest';
import { ApiResponse, ApiResponseSimple } from './ApiResponse';
import { ApiStatus } from './ApiStatus';
import { Beacon } from './Beacon';
/**
 * Client library that communicates with the Snapsites API.
 */
export declare class Client {
    /**
     * The default request to use when making a request.
     */
    static defaultApiRequest: Partial<ScrapeRequest>;
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
    screenshot: (endpoint: string, apiSecret: string, req: ScrapeRequest) => Promise<ApiResponse>;
    /**
     * Sends a screenshot request to snapsites and waits for snapsites to finish generating
     * the screenshots before returning.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param apiSecret The API secret for the endpoint.
     * @param req The details of the page to screenshot.
     */
    screenshotWait: (endpoint: string, apiSecret: string, req: ScrapeRequest) => Promise<ApiResponse>;
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
    batchScreenshots: (endpoint: string, apiSecret: string, req: ScrapeRequest[]) => Promise<ApiResponseSimple>;
    /**
     * Sends a batch of screenshots to be taken and waits for snapsites to finish generating
     * the screenshots before returning.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param apiSecret The API secret for the endpoint.
     * @param req The details of the page to screenshot.
     */
    batchScreenshotsWait: (endpoint: string, apiSecret: string, req: ScrapeRequest[]) => Promise<ApiResponseSimple>;
    /**
     * Gets the status of a request.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param apiSecret The API secret for the endpoint.
     * @param apiRequest The ID of the request.
     */
    status: (endpoint: string, apiSecret: string, apiRequest: string) => Promise<ApiStatus>;
    /**
     * Returns the status of all ApiRequests for an endpoint.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param apiSecret The API secret for the endpoint.
     * @param limit The maximum number of requests to return.
     * @param offset The offset to start at.
     */
    statusAll: (endpoint: string, apiSecret: string, limit?: number, offset?: number) => Promise<Omit<ApiStatus, 'logs' | 'request'>[]>;
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
    onBeacon: (beaconUri: string | {
        beaconUri: string;
    }, on: (beacons: Beacon[]) => void) => Unsubscribe;
    /**
     * Makes a request to the API.
     *
     * @param method The method to use.
     * @param url The URL to request.
     * @param apiSecret The API secret for the endpoint.
     * @param body The body of the request.
     */
    private doRequest;
}
