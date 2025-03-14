import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

//for register

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

//for login

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found!!');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new Error('password is not Correct');
  }

  // const jwtPayload = {
  // email: user.email,
  // role: user.role,
  // };

  // const token = jwt.sign({ jwtPayload }, 'secret', { expiresIn: '30d' });

  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '30d',
  });

  // return { token, user };

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    // user: user,
  };

  return { token, verifiedUser };
};

//For changePassword

const changpassword = async (
  userdata: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.findOne(userdata.id).select('+password');

  if (!user) {
    throw new Error('User not found!!');
  }

  // checking if the password is correct
  //
  //  if(!(await User.isPasswordMatch(payload.oldPassword, user?.password)))
  //  throw new Error('password is not Matched');
  //

  // hash new Pasword
  const newhasdpassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userdata.userId,
      role: userdata.role,
    },
    {
      password: newhasdpassword,
    },
  );
  return null;
};

export const AuthService = {
  register,
  login,
  changpassword,
};
