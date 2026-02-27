import { HTTPmethod } from "../api";
import { LoginRequest } from "../auth";
import { RegisterRequest } from "../register";
import { ChangePassRequest, UpdateUserProfileRequest } from "../user";

export interface RequesterArgs {
  method: HTTPmethod;
  url: string;
  token?: string;
  formData?: FormDataObject;
  queryKeys?: string[],
  queries?: QueryObject;
  file?: Blob;
}

export type FormDataObject = LoginRequest | RegisterRequest | UpdateUserProfileRequest | ChangePassRequest;

type QueryObject = { [K: string]: number | string }
