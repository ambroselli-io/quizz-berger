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
  host = import.meta.env.DEV ? 'http://localhost:5179' : 'https://api.quizz-du-berger.com';
  getUrl = (path: string, query: Record<string, string> = {}) => {
    const params = new URLSearchParams(query).toString();
    return `${this.host}${path}${params ? `?${params}` : ''}`;
  };
  execute = async ({ method = 'GET', path = '', query = {}, headers = {}, body }: ApiExecuteArgs) => {
    try {
      const url = this.getUrl(path, query);

      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (response.json) {
        try {
          const readableRes = await response.json();
          return readableRes;
        } catch (e) {
          console.log('ERROR IN RESPONSE JSON', response);
          console.log(e);
        }
      }

      return response;
    } catch (e) {
      console.log(' error in api');
      console.log(e);
      return {
        ok: false,
        error:
          "Veuillez nous excuser, cette erreur est inattendue : l'équipe technique a été prévenue. Veuillez retenter dans quelques instants ou nous contacter si l'erreur persiste.",
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
