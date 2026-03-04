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
  createEvent = 'create private event',
  updateEvent = 'update private event',
  deleteEvent = 'delete private event',
  getPrivateEvents = 'get private events',
  getRecurringEvents = 'get recurring events',
  setEventAttendance = 'set event attendance', // vote
  // getAttendanceForEvent = 'get attendance for event',//  get them as include 
  // eventually - add comment for event... 
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
  [ApiEndpoints.getLng]: { // no 
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
  [ApiEndpoints.logout]: { // test 
    url: ApiRouts.auth,
    method: HTTPmethod.get,
    needCredentials: false,
    params: ['userId'],
  },
  [ApiEndpoints.register]: { // test 
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
  [ApiEndpoints.uploadAvatar]: { // TODO 
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
  [ApiEndpoints.createEvent]: {
    url: ApiRouts.events,
    method: HTTPmethod.post,
    needCredentials: true,
  },
  [ApiEndpoints.updateEvent]: {
    url: ApiRouts.events,
    method: HTTPmethod.put,
    needCredentials: true,
    params: ['eventId'],
  },
  [ApiEndpoints.deleteEvent]: {
    url: ApiRouts.events,
    method: HTTPmethod.delete,
    needCredentials: true,
    params: ['eventId'],
  }, 
  [ApiEndpoints.getPrivateEvents]: {
    url: ApiRouts.events,
    method: HTTPmethod.get,
    needCredentials: true,
    queryKeys: ['start', 'end'], // Dates
  },   
  [ApiEndpoints.getRecurringEvents]: {
    url: ApiRouts.events,
    method: HTTPmethod.get,
    needCredentials: true,
    additionalUrl: 'recurring',
  },
  [ApiEndpoints.setEventAttendance]: {
    url: ApiRouts.events,
    method: HTTPmethod.post,
    needCredentials: true,
    params: ['eventId'],
    additionalUrl: 'attendance',
  },
}
