import MockRequest from './mock-request';
import { isEmptyObject, isEquivalent, toParams } from "../utils/helper-functions";

export default class MockAnyRequest extends MockRequest {

  constructor({type = 'GET', url, responseText, status = 200}) {
    super();
    this.responseJson = responseText;
    this.url = url;
    this.type = type;
    this.status = status;
    this.setupHandler();
  }

  getUrl() {
    return this.url;
  }

  getType() {
    return this.type;
  }

  /**
   * Return some form of object
   *
   * @param json
   * @returns {*}
   */
  returns(json) {
    this.responseJson = json;
    return this;
  }

  paramsMatch(request) {
    if (!isEmptyObject(this.queryParams)) {
      if (this.type === 'GET') {
        return isEquivalent(request.queryParams, toParams(this.queryParams));
      }
      if (/POST|PUT|PATCH/.test(this.type)) {
        let requestBody = JSON.parse(request.requestBody);
        return isEquivalent(requestBody, toParams(this.queryParams));
      }
    }
    return true;
  }

}
