import axios from 'axios';
import { ApiRequest } from '@/ApiRequest';
import { ApiResponse } from './ApiResponse';

axios.defaults.baseURL = 'http://dev-api.snapsites.io';

/**
 * Client library that communicates with the Snapsites API.
 */
export class Client {
  /**
   * The API key created when the endpoint was created.
   */
  public apiKey: string;

  /**
   * The API secret created when the endpoint was created.
   */
  public apiSecret: string;

  /**
   * The default request to use when making a request.
   */
  public static defaultApiRequest: ApiRequest = {
    url: '',
    html: '',
    type: 'jpg',
  };

  /**
   * Constructor
   *
   * @param apiKey The API key for the endpoint.
   * @param apiSecret The API secret for the endpoint.
   */
  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  /**
   * Takes a screenshot of a page.
   *
   * @param endpoint The ID of the endpoint to use.
   * @param req The details of the page to screenshot.
   */
  public screenshot = async (
    endpoint: string,
    req: ApiRequest | ApiRequest[],
  ): Promise<ApiResponse> => {
    const body = this.createBody(req);
    const resp = await axios.post(`/${endpoint}`, body, {
      headers: {
        'X-Api-Key': this.apiKey,
        'X-Api-Secret': this.apiSecret,
      },
    });

    return resp.data;
  };

  /**
   * Merges in the default request params with the ones given.
   *
   * @param req The req to merge the defaults into.
   */
  private createBody = (req: ApiRequest | ApiRequest[]): ApiRequest[] => {
    const newReq: ApiRequest[] = [];
    if (Array.isArray(req)) {
      newReq.forEach((p) => req.push({ ...Client.defaultApiRequest, ...p }));
    } else {
      newReq.push({ ...Client.defaultApiRequest, ...req });
    }

    return newReq;
  };
}
