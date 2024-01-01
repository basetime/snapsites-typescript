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
    constructor() {
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
        this.screenshot = async (endpoint, apiSecret, req) => {
            const body = Object.assign(Object.assign({}, Client.defaultApiRequest), req);
            return await this.doRequest('POST', `/${endpoint}?wait=0`, apiSecret, body);
        };
        /**
         * Sends a screenshot request to snapsites and waits for snapsites to finish generating
         * the screenshots before returning.
         *
         * @param endpoint The ID of the endpoint to use.
         * @param apiSecret The API secret for the endpoint.
         * @param req The details of the page to screenshot.
         */
        this.screenshotWait = async (endpoint, apiSecret, req) => {
            const body = Object.assign(Object.assign({}, Client.defaultApiRequest), req);
            return await this.doRequest('POST', `/${endpoint}?wait=1`, apiSecret, body);
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
        this.batchScreenshots = async (endpoint, apiSecret, req) => {
            const body = [];
            for (let i = 0; i < req.length; i++) {
                body.push(Object.assign(Object.assign({}, Client.defaultApiRequest), req[i]));
            }
            return await this.doRequest('POST', `/${endpoint}?wait=0`, apiSecret, body);
        };
        /**
         * Sends a batch of screenshots to be taken and waits for snapsites to finish generating
         * the screenshots before returning.
         *
         * @param endpoint The ID of the endpoint to use.
         * @param apiSecret The API secret for the endpoint.
         * @param req The details of the page to screenshot.
         */
        this.batchScreenshotsWait = async (endpoint, apiSecret, req) => {
            const body = [];
            for (let i = 0; i < req.length; i++) {
                body.push(Object.assign(Object.assign({}, Client.defaultApiRequest), req[i]));
            }
            return await this.doRequest('POST', `/${endpoint}?wait=1`, apiSecret, body);
        };
        /**
         * Gets the status of a request.
         *
         * @param endpoint The ID of the endpoint to use.
         * @param apiSecret The API secret for the endpoint.
         * @param apiRequest The ID of the request.
         */
        this.status = async (endpoint, apiSecret, apiRequest) => {
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
        this.statusAll = async (endpoint, apiSecret, limit = 25, offset = 0) => {
            return await this.doRequest('GET', `/${endpoint}/status?limit=${limit}&offset=${offset}`, apiSecret);
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
         * @param apiSecret The API secret for the endpoint.
         * @param body The body of the request.
         */
        this.doRequest = async (method, url, apiSecret, body) => {
            const opts = {
                method,
                url,
                headers: {
                    'X-Api-Secret': apiSecret,
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
    meta: '',
};
//# sourceMappingURL=Client.js.map