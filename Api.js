/**
 *  Import from node modules/ libraries / global
 */
import apisauce from 'apisauce'
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';

const text = 'email:password';
const bytes = utf8.encode(text);
const encoded = binaryToBase64(bytes);

/**
 *  Get API end point from  ApiConstant file
 */
import {
  API_END_POINT,
  BASE_PATH
} from './ApiConstants'

/**
 * @class API
 * Singleton class for  making all API calls
 */
class API {
  /**
   * @method {constructor} API class constructor
   * @property {string} API_END_POINT - base URL to make an API call
   * @property {Object} headers - API header to make an API call
   * @property {number} timeout - API timeout in millisecond
   */
    constructor() {
      const baseURL = API_END_POINT;
      const headers = {
                          'Cache-Control': 'no-cache',
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Basic ${encoded}`
                      }
      const timeout = 10000;
      this.api = apisauce.create({ baseURL, headers, timeout });
    }
    /**
     * @method {get} API - get request
     * @param {Object} path - realative path to API call
     * @param {Object} options - to pass addtional  headers
     * @return {Promise} - will return respose promise
     */

    _get(path: string, options?: Object): Promise<> {
      return this.api.get(BASE_PATH + path, { headers: this.api.headers, ...options }).then(this._getResponse)
    }

    /**
     * @method {post} API post request
     * @param {Object} path - realative path to API call
     * @param {Object} body - request body
     * @param {Object} options - to pass addtional  headers
     * @return {Promise} - will return response promise
     */

    _post(path: string, body?: Object, options?: Object): Promise<> {
      return this.api.post(BASE_PATH + path, body, { headers: this.api.headers, ...options }).then(this._getResponse)
    }

    /**
     * @method {put} API put request
     * @param {Object} path - realative path to API call
     * @param {Object} body - request body
     * @param {Object} options - to pass addtional  headers
     * @return {Promise} - will return response promise
     */

    _put(path: string, body?: Object, options?: Object): Promise<> {
      return this.api.put(BASE_PATH + path, body, { headers: this.api.headers, ...options }).then(this._getResponse)
    }

    /**
     * @method {patch} API patch request
     * @param {Object} path - realative path to API call
     * @param {Object} body - request body
     * @param {Object} options - to pass addtional  headers
     * @return {Promise} - will return response promise
     */

    _patch(path: string, body?: Object, options?: Object): Promise<> {
      return this.api.patch(BASE_PATH + path, body, { headers: this.api.headers, ...options }).then(this._getResponse)
    }

    /**
     * @method {delete} API delete request
     * @param {Object} path - realative path to API call
     * @param {Object} body - request body
     * @param {Object} options - to pass addtional  headers
     * @return {Promise} - will return response promise
     */

    _del(path: string, body?: Object, options?: Object): Promise<> {
      return this.api.del(BASE_PATH + path, body, { headers: this.api.headers, ...options }).then(this._getResponse)
    }

    /**
     * @method {getResponse}  respose for all get/put/post/patch/delete api request
     * @param {Object} respose object
     * @return {Promise} - will return response promise
     */

    _getResponse(response: Object): Promise<> {
      if (__DEV__) {
        console.log('API response :', response)
      }
      if (response.ok) {
        return Promise.resolve(response)
      }
      //Handle any custom error message here
      const errorMessage: string = `Status: ${response.status}`
      const error: Error = new Error(errorMessage)
      return Promise.reject(error)
    }
}
export const api = new API();
