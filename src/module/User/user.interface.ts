/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// export type TUser = {
// _id?: string;
// name: string;
// email: string;
// password: string;
// role: 'user' | 'admin';
// isBlocked: boolean;
// matchPassword:string
// };

export interface TUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
