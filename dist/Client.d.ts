import { ApiRequest, BatchApiRequest } from './ApiRequest';
import { ApiResponse, BatchApiResponse } from './ApiResponse';
import { ApiStatus } from './ApiStatus';
/**
 * Client library that communicates with the Snapsites API.
 */
export declare class Client {
    /**
     * The API secret created when the endpoint was created.
     */
    apiSecret: string;
    /**
     * The default request to use when making a request.
     */
    static defaultApiRequest: ApiRequest;
    /**
     * Constructor
     *
     * @param apiSecret The API secret for the endpoint.
     */
    constructor(apiSecret: string);
    /**
     * Takes a screenshot of a page.
     *
     * ```ts
     * const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', {
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
     * //   images: {
     * //     '0': 'https://api.snapsites.io/image/123.jpg'
     * //   },
     * //   pdfs: {}
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
    screenshot: (endpoint: string, req: ApiRequest) => Promise<ApiResponse>;
    /**
     * Sends a batch of screenshots to be taken.
     *
     * ```ts
     * const resp = await client.screenshot('dyNmcmgxd4BFmuffdwCBV0', {
     *    'splash-1': {
     *      url: 'https://avagate.com/splash-1',
     *      type: 'jpg',
     *    },
     *    'splash-2': {
     *      url: 'https://avagate.com/splash-2',
     *      type: 'jpg',
     *    },
     * });
     * console.log(resp);
     *
     * // {
     * //   id: '7473bbe4-b2bf-4858-9a9c-476d302df5b9',
     * //   time: 11094,
     * //   status: 'https://api.snapsites.io/status/7473bbe4-b2bf-4858-9a9c-476d302df5b9',
     * //   cost: -0.2,
     * //   balance: 1000,
     * //   images: {
     * //     'splash-1': 'https://api.snapsites.io/image/123.jpg',
     * //     'splash-2': 'https://api.snapsites.io/image/456.jpg',
     * //   },
     * //   pdfs: {}
     * // }
     * ```
     *
     * @param endpoint The ID of the endpoint to use.
     * @param req The details of the page to screenshot.
     */
    batchScreenshots: (endpoint: string, req: BatchApiRequest) => Promise<BatchApiResponse>;
    /**
     * Gets the status of a request.
     *
     * @param endpoint The ID of the endpoint to use.
     * @param id The ID of the request.
     */
    status: (endpoint: string, id: string) => Promise<ApiStatus>;
}
