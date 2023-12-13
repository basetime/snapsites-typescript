"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.baseURL = 'http://dev-api.snapsites.io';
/**
 * Client library that communicates with the Snapsites API.
 */
class Client {
    /**
     * Constructor
     *
     * @param apiSecret The API secret for the endpoint.
     */
    constructor(apiSecret) {
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
        this.screenshot = async (endpoint, req) => {
            const body = Object.assign(Object.assign({}, Client.defaultApiRequest), req);
            const resp = await axios_1.default.post(`/${endpoint}`, body, {
                headers: {
                    'X-Api-Secret': this.apiSecret,
                },
            });
            return resp.data;
        };
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
        this.batchScreenshots = async (endpoint, req) => {
            const body = {};
            Object.keys(req).forEach((key) => {
                body[key] = Object.assign(Object.assign({}, Client.defaultApiRequest), req[key]);
            });
            const resp = await axios_1.default.post(`/${endpoint}`, body, {
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
         * @param id The ID of the request.
         */
        this.status = async (endpoint, id) => {
            const resp = await axios_1.default.get(`/${endpoint}/status/${id}`, {
                headers: {
                    'X-Api-Secret': this.apiSecret,
                },
            });
            return resp.data;
        };
        this.apiSecret = apiSecret;
    }
}
exports.Client = Client;
/**
 * The default request to use when making a request.
 */
Client.defaultApiRequest = {
    url: '',
    html: '',
    type: 'jpg',
};
//# sourceMappingURL=Client.js.map