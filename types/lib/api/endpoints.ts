export enum ApiRouts {
  languages = '/languages',
  publicEvents = '/events',
  events = '/mobile/events',
  auth = '/mobile/auth',
  users = '/mobile/users',
}

export enum ApiEndpoints {
  getLng = 'get Languages',
  getPublicEvents = 'get Public Events',
  login = 'login',
  logout = 'logout',
  register = 'register User',
  updateUserProfile = 'update User Profile',
  uploadAvatar = 'upload User Avatar',
  changePass = 'change Password',
}

export enum HTTPmethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  // patch = "PATCH",
  delete = "DELETE",
}

export interface HTTPrequest {
  url: ApiRouts,
  method: HTTPmethod,
  needCredentials: boolean;
  params?: string[];
  queryKeys?: string[];
  additionalUrl?: string;
}

export type ApiCalls = Record<ApiEndpoints, HTTPrequest>;


export const ElbetitsaApiCalls: ApiCalls = {
  [ApiEndpoints.getLng]: {
    url: ApiRouts.languages,
    method: HTTPmethod.get,
    needCredentials: false,
  },
  [ApiEndpoints.getPublicEvents]: {
    url: ApiRouts.publicEvents,
    method: HTTPmethod.get,
    needCredentials: false,
    queryKeys: ['languageId', 'itemsPerPage', 'currentPage', 'search'],
  },
  [ApiEndpoints.login]: {
    url: ApiRouts.auth,
    method: HTTPmethod.post,
    needCredentials: false,
  },
  [ApiEndpoints.logout]: {
    url: ApiRouts.auth,
    method: HTTPmethod.get,
    needCredentials: false,
    params: ['userId'],
  },
  [ApiEndpoints.register]: {
    url: ApiRouts.users,
    method: HTTPmethod.post,
    needCredentials: false,
  },
  [ApiEndpoints.updateUserProfile]: {
    url: ApiRouts.users,
    method: HTTPmethod.put,
    needCredentials: true,
    params: ['userId'],
  },
  [ApiEndpoints.uploadAvatar]: {
    url: ApiRouts.users,
    method: HTTPmethod.post,
    needCredentials: true,
    params: ['userId'],
    additionalUrl: 'avatar',
  },
    [ApiEndpoints.changePass]: {
    url: ApiRouts.users,
    method: HTTPmethod.post,
    needCredentials: true,
    params: ['userId'],
    additionalUrl: 'password',
  },
}
