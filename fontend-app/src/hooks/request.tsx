
const panoramasRequest = {
    get: (url: string) => request(url, {
            method:'GET'}),
    post: (url: string, formData: {}) => request(url, {
            method:'POST',
            body: JSON.stringify(formData)}),
    put: (url: string, body: {}) => request(url, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)})
}


async function request<TResponse>(
    url: string,
    config: RequestInit = {}
  ): Promise<TResponse> {
    return fetch(url, config)
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  export default panoramasRequest;