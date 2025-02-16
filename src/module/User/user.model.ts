import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
// import bcrypt from 'bcrypt';
// import config from '../../app/config';

const userSchema = new Schema<TUser>(
  {
    //    id:String,

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please Provide Your Email'],
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: '{VALUE} is not valid, pleage provide  a valid role',
      },
      immutable: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hook -> pre

// userSchema.pre('save', async function (next) {
//   const user = this;
//
//   user.password = await bcrypt.hash(
// user.password,
// Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// Hook -> post

// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

export const User = model<TUser>('User', userSchema);
export default User;
