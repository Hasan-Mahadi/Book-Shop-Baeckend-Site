/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// export type TUser = {
// _id?: string;
// name: string;
// email: string;
// password: string;
// role: 'user' | 'admin';
// isBlocked: boolean;
// matchPassword:string
// };

import { ObjectId } from "mongoose";

export interface TUser {
  _id: any | ObjectId;
  // _id?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  password: string;
  passwordConfirm: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  needPasswordChange: boolean;
  isPasswordMatch: boolean;
}
