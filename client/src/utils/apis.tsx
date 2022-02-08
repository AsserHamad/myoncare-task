export const baseURL = process.env.URL || `http://localhost:9000/api`;

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */

export const LoginAPI = `/auth/login`;

export const RegisterAPI = `/auth/register`;

export const VerifyTokenAPI = `/auth/verify`;

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

export const GetAllUsersAPI = `/users/`;

export const GetUserAPI = (id : string|number) => `/users/${id}`;

export const UpdateUserAPI = (id : string|number) => `/users/${id}`;

export const DeleteUserAPI = (id : string|number) => `/users/${id}`;