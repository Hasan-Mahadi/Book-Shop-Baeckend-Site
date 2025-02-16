export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
};
