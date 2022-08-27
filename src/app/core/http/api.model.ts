export enum ApiMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export enum ApiEndpoint {
  SignIn = 'auth/sign-in',
  SignUp = 'auth/sign-up',
  ForgotPassword = 'auth/forgot',
  RefreshToken = 'auth/refresh-token',
}
