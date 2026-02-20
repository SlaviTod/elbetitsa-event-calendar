import { ElbetitsaApiCalls, HTTPmethod, RequesterArgs, RequesterOptions } from "../../elbetitsa-types/dist";


export const requester = async ({
  method,
  url,
  token,
  formData,
  queries,
  file,
}: RequesterArgs) => {
  const options: Partial<RequestInit> = {};
  let queryString: string = '';

  if (method !== HTTPmethod.get) options.method = method;
  if (formData) {
    options.headers = {
      'content-type': 'application/json',
    };

    options.body = JSON.stringify(formData);
  }
  if (token) options.headers = { ...options.headers, 'authorization': `Bearer ${token}` };

  if (queries) {
    const queryKeys = ElbetitsaApiCalls[url][method]?.queries;
    if (queryKeys?.length) {
      queryKeys.forEach((key, index) => {
        if (queries[key]) queryString += `${index ? '&' : '?'}${key}=${encodeURIComponent(queries[key])}`;
      });
    }
  }

  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    options.body = formData;
  }

  const response = await fetch(`${url}${queryString}`, options);

  const result = await response.json();

  if (result.message) throw result;

  return result;
} 