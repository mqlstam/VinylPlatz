  // libs/backend/features/src/lib/user/user.schema.ts

  import * as mongoose from 'mongoose';
  import * as bcrypt from 'bcrypt';
  import { IUserDocument } from './userdocument.interface';



  export const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true // Removes whitespace from both ends
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true // Converts email to lowercase
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      trim: true
    },
    profileImage: {
      type: String, // URL to the image
      required: false
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'], // Specify the allowed roles
      default: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }

    // Add other fields as needed
  });

  // Pre-save hook
  UserSchema.pre<IUserDocument>('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error as any); // Casting to 'any' to handle the unknown type error
    }
  });

  // ComparePassword method
  // ComparePassword method
  UserSchema.methods['comparePassword'] = async function(this: IUserDocument, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

  export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
