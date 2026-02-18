import { EmailAddress, Timestamps, UUID, Voice } from "../shared"
import { Role } from "./Role";


export interface User extends Timestamps {
  userId: UUID;
  number: number;
  firstName: string;
  lastName: string;
  email: EmailAddress;
  role: Role;
  voice: Voice | null;
  isBlocked: boolean;
  avatar: string | null;
}