import { EmailAddress } from "../shared";
import { User } from "../user";

export interface LoginRequest {
  email: EmailAddress;
  password: string; 
}

export interface LoginResponse {
  user: User;
  token: string;
}