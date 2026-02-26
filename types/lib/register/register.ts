export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
} 

export interface RegisterForm extends RegisterRequest {
  confirmPassword: string;
}

