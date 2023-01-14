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
  ChangePassword = 'change-password',
  RefreshToken = 'refresh-token',
  CheckExistingEmail = 'check-existing-email',
  Profile = 'profile',
  Avatar = 'avatar',
  Certificates = 'certificates',
  Users = 'users',
  UserAvatar = 'users/avatar',
  UserCertificates = 'users/certificates',
  ChangePasswordUser = 'users/change-password',
  BlockUser = 'users/block',
  ApproveUser = 'users/approve',
  RejectUser = 'users/reject',
}

export interface IApiResponse<DataType = any> {
  status: 'success' | 'error' | 'fail';
  message?: string;
  data?: DataType;
  code?: number;
}
