
const api = {
    get: (url:string) => {request(url)},
    post: (url: string, body: {}) => request(url, {method:'POST', ...body})
}


async function request<TResponse>(
    url: string,
    config: RequestInit = {}
  ): Promise<TResponse> {
    return fetch(url, config)
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  export default api;