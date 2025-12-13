export interface IResponse {
  expiresOn: Date | null;
  isAuthenticated: boolean;
  fullName: null | string;
  userId: string;
  message: null | string;
  roles: string[];
  token: string;
  nationalId: null | string;
}
