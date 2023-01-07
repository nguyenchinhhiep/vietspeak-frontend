export enum ApiMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export enum ApiEndpoint {
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgot-password',
  PasswordReset = 'password-reset',
  RefreshToken = 'refresh-token',
  CheckExistingEmail = 'check-existing-email',
  Profile = 'profile',
  Avatar = 'avatar',
  UploadCertificates = 'certificates',
}

export interface IApiResponse<DataType = any> {
  status: 'success' | 'error' | 'fail';
  message?: string;
  data?: DataType;
}
