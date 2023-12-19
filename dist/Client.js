"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const database_1 = require("firebase/database");
const firebase_1 = require("./firebase");
axios_1.default.defaults.baseURL = 'http://dev-api.snapsites.io';
/**
 * Client library that communicates with the Snapsites API.
 */
class Client {
    /**
     * Constructor
     *
     * @param apiSecret The API secret for the endpoint.
     * @param wait Whether to wait for the request to complete.
     */
    constructor(apiSecret, wait = true) {
        this.apiSecret = apiSecret;
        this.wait = wait;
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
        this.screenshot = async (endpoint, req) => {
            const body = Object.assign(Object.assign({}, Client.defaultApiRequest), req);
            return await this.doRequest('POST', `/${endpoint}?wait=${this.wait ? '1' : '0'}`, body);
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
        this.batchScreenshots = async (endpoint, req) => {
            const body = [];
            for (let i = 0; i < req.length; i++) {
                body.push(Object.assign(Object.assign({}, Client.defaultApiRequest), req[i]));
            }
            return await this.doRequest('POST', `/${endpoint}?wait=${this.wait ? '1' : '0'}`, body);
        };
        /**
         * Gets the status of a request.
         *
         * @param endpoint The ID of the endpoint to use.
         * @param apiRequest The ID of the request.
         */
        this.status = async (endpoint, apiRequest) => {
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
        this.onBeacon = (beaconUri, on) => {
            const db = (0, firebase_1.getRealtimeDatabase)();
            const beaconRef = (0, database_1.ref)(db, typeof beaconUri === 'string' ? beaconUri : beaconUri.beaconUri);
            return (0, database_1.onValue)(beaconRef, (snapshot) => {
                on(snapshot.val());
            });
        };
        /**
         * Makes a request to the API.
         *
         * @param method The method to use.
         * @param url The URL to request.
         * @param body The body of the request.
         */
        this.doRequest = async (method, url, body) => {
            const opts = {
                method,
                url,
                headers: {
                    'X-Api-Secret': this.apiSecret,
                },
            };
            if (body) {
                opts.data = body;
            }
            const resp = await axios_1.default.request(opts);
            return resp.data;
        };
    }
}
exports.Client = Client;
/**
 * The default request to use when making a request.
 */
Client.defaultApiRequest = {
    browser: 'chromium',
    url: '',
    html: '',
    type: 'jpg',
};
//# sourceMappingURL=Client.js.map