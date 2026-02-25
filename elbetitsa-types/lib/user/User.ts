import { Timestamps, Voice } from "../shared"
import { Role } from "./Role";


export interface User extends Timestamps {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  voice: Voice | null;
  isBlocked: boolean;
  avatar: string | null;
}