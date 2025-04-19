export interface ISignInSchema {
  data?: IUserSchema;
  accessToken?: string;
}

export interface IRequestSignInSchema {
  password: string;
  email: string;
}

export interface IUserSchema {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  userType?: string;
}
