import { Timestamps, Voice } from "../shared"
import { Role } from "./Role";


export interface User extends Timestamps {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  voice: Voice | undefined;
  isBlocked: boolean;
  avatar: string | null;
}

export interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  voice?: Voice | undefined;
}
export interface UpdateUserResponse {
  user: User;
}

export interface ChangePassRequest {
  oldPass: string;
  password: string;
}
export interface ChangePassForm extends ChangePassRequest {
  confirmPassword: string;
}