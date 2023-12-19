import { Unsubscribe } from 'firebase/database';
import { ScrapeRequest } from './ApiRequest';
import { ApiResponse, ApiResponseSimple } from './ApiResponse';
import { ApiStatus } from './ApiStatus';
import { Beacon } from './Beacon';
/**
 * Client library that communicates with the Snapsites API.
 */
export declare class Client {
    readonly apiSecret: string;
    readonly wait: boolean;
    /**
     * The default request to use when making a request.
     */
    static defaultApiRequest: Partial<ScrapeRequest>;
    /**
     * Constructor
     *
     * @param apiSecret The API secret for the endpoint.
     * @param wait Whether to wait for the request to complete.
     */
    constructor(apiSecret: string, wait?: boolean);
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
    screenshot: (endpoint: string, req: ScrapeRequest) => Promise<ApiResponse>;
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
    batchScreenshots: (endpoint: string, req: ScrapeRequest[]) => Promise<ApiResponseSimple>;
    /**
     * Gets the status of a request.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param apiRequest The ID of the request.
     */
    status: (endpoint: string, apiRequest: string) => Promise<ApiStatus>;
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
    onBeacon: (beaconUri: string | {
        beaconUri: string;
    }, on: (beacon: Beacon) => void) => Unsubscribe;
    /**
     * Makes a request to the API.
     *
     * @param method The method to use.
     * @param url The URL to request.
     * @param body The body of the request.
     */
    private doRequest;
}
