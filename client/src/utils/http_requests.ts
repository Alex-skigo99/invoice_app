// generic request function
async function request<TResponse>(
    url: string, 
    config: RequestInit = { method: 'GET' }  // default GET
  ): Promise<Awaited<TResponse> | undefined> {
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log('request response data-', data);  // debug
      if (response.status === 200) {
        return data;
        }
        else throw new Error(`Response error. Status ${response.status}`);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
};

// api - collection of HTTP methods
export const api = {
    get: <TResponse>(url: string) => 
        request<TResponse>(url),

    post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
        request<TResponse>(url, { method: 'POST', body }),

    patch: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
        request<TResponse>(url, { method: 'PATCH', body }),

    delete: <TResponse>(url: string) =>
        request<TResponse>(url, { method: 'DELETE' }),

    post_credentials: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
        request<TResponse>(url, { 
          method: 'POST',
          body,
          credentials: 'include',  // include cookies
          }),
    
    get_credentials: <TResponse>(url: string) => 
      request<TResponse>(url, {
          method: 'GET',
          credentials: 'include', // include cookies
      }),
    
};
