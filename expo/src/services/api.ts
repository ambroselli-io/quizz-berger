import { API_HOST } from '~/config';
import storage from '~/utils/storage';

interface ApiArgs {
  path?: string;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

interface ApiExecuteArgs extends ApiArgs {
  method?: string;
}

class ApiService {
  host = API_HOST;

  getUrl = (path: string, query: Record<string, string> = {}) => {
    const params = new URLSearchParams(query).toString();
    return `${this.host}${path}${params ? `?${params}` : ''}`;
  };

  getToken = (): string | null => {
    try {
      return storage.getString('auth-token') ?? null;
    } catch {
      return null;
    }
  };

  setToken = (token: string | null) => {
    if (token) {
      storage.set('auth-token', token);
    } else {
      storage.delete('auth-token');
    }
  };

  execute = async ({
    method = 'GET',
    path = '',
    query = {},
    headers = {},
    body,
  }: ApiExecuteArgs) => {
    try {
      const url = this.getUrl(path, query);
      const token = this.getToken();

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (response.json) {
        try {
          const readableRes = await response.json();
          // Store token if returned in response
          if (readableRes?.token) {
            this.setToken(readableRes.token);
          }
          return readableRes;
        } catch (e) {
          console.log('ERROR IN RESPONSE JSON', response);
          console.log(e);
        }
      }

      return response;
    } catch (e) {
      console.log('error in api', e);
      return {
        ok: false,
        error:
          "Veuillez nous excuser, cette erreur est inattendue. Veuillez retenter dans quelques instants.",
      };
    }
  };

  get = async (args: ApiArgs) => this.execute({ method: 'GET', ...args });
  post = async (args: ApiArgs) => this.execute({ method: 'POST', ...args });
  put = async (args: ApiArgs) => this.execute({ method: 'PUT', ...args });
  delete = async (args: ApiArgs) => this.execute({ method: 'DELETE', ...args });
}

const API = new ApiService();
export default API;
