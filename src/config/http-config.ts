import { environment } from '../environments/environment';

export class HttpConfig {
  private static readonly MAIN_API_URL = '/main-service/api/v1';
  
  static mainApiUrl() {
    return environment.mainUrl + this.MAIN_API_URL;
  }
}