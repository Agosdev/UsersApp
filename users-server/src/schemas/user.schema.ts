import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/users/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ unique: true, trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  password: string;

  @Prop({ default: Role.ADMIN })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
