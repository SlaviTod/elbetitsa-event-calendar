export enum ApiEndpoints {
  languages = '/languages',
  publicEvents = '/events',
  events = '/mobile/events',
  auth = '/mobile/auth',
  register = '/users',
}

export enum HTTPmethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export interface HTTPrequest {
  needCredentials: boolean;
  params?: string[];
  queries?: string[];
}

export type ApiRequestType = Partial<Record<HTTPmethod, HTTPrequest>>


export type ApiCalls = Record<ApiEndpoints, ApiRequestType>;


export const ElbetitsaApiCalls: ApiCalls = {
  [ApiEndpoints.languages]: {
    [HTTPmethod.get]: {
      needCredentials: false,
    },
  },
  [ApiEndpoints.publicEvents]: {
    [HTTPmethod.get]: {
      needCredentials: false,
      queries: ['languageId', 'itemsPerPage', 'currentPage', 'search'],
    },
  },
  [ApiEndpoints.events]: {
    [HTTPmethod.get]: {
      needCredentials: true,
      params: ['eventId'],
      queries: ['languageId'],
    },
    [HTTPmethod.post]: {
      needCredentials: true,
    },
    [HTTPmethod.put]: {
      needCredentials: true,
      params: ['eventId'],
    },
    [HTTPmethod.delete]: {
      needCredentials: true,
      params: ['eventId'],
    },
  },
  [ApiEndpoints.auth]: {
    [HTTPmethod.post]: {
      needCredentials: false,
    },
    [HTTPmethod.get]: {
      needCredentials: false,
      params: ['eventId'],
    },
  },
  [ApiEndpoints.register]: {
    [HTTPmethod.post]: {
      needCredentials: false,
    }
  }
}
