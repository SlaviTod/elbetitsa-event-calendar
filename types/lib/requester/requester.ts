import { HTTPmethod } from "../api";
import { LoginRequest } from "../auth";
import { PrivateEventRequest, PrivateEventUpdateRequest } from "../event";
import { RegisterRequest } from "../register";
import { ChangePassRequest, UpdateUserProfileRequest } from "../user";

export interface RequesterArgs {
  method: HTTPmethod;
  url: string;
  token?: string;
  formData?: FormDataObjectType;
  queryKeys?: string[],
  queries?: QueryObject;
  file?: Blob;
}

export type FormDataObjectType = LoginRequest | RegisterRequest | UpdateUserProfileRequest | ChangePassRequest | PrivateEventRequest | PrivateEventUpdateRequest;

type QueryObject = { [K: string]: number | string }
