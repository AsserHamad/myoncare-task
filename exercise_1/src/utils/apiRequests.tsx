import { UserI } from "../types/general.types";
import { DeleteUserAPI, GetAllUsersAPI, GetUserAPI, LoginAPI, RegisterAPI, VerifyTokenAPI } from "./apis";
import HTTP from "./axios";

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
export const login = async (email : string, password : string) => await HTTP.post(LoginAPI, {email, password});

export const register = async (email : string, password : string) => await HTTP.post(RegisterAPI, {email, password});

export const verifyToken = async () => await HTTP.get(VerifyTokenAPI);

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */
export const getAllUsers = async () => await HTTP.get<UserI[]>(GetAllUsersAPI);

export const getUser = async (id : string|number) => await HTTP.get<UserI>(GetUserAPI(id));

export const updateUser = async (id : string|number, email : string, name : string) => await HTTP.patch<UserI>(GetUserAPI(id), {email, name });

export const deleteUser = async (id : string|number) => await HTTP.delete(DeleteUserAPI(id));