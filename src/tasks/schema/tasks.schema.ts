import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  readonly createdAt: Date;

  @Prop()
  readonly updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);