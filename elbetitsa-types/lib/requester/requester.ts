import { ApiEndpoints, HTTPmethod } from "../api";
import { LoginRequest } from "../auth";

export interface RequesterArgs {
  method: HTTPmethod;
  url: ApiEndpoints;
  token?: string;
  formData?: FormDataObject;
  queries?: QueryObject;
  file?: Blob;
}

export type FormDataObject = LoginRequest;

type QueryObject = { [K: string]: number | string }
