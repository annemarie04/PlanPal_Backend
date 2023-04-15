import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
export class Task {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop()
  date: Date;
  
  @Prop({enum: ['to do', 'in progress', 'done'], default: 'to do'})
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({default: Date.now()})
  readonly createdAt: Date;

  @Prop({default: Date.now()})
  readonly updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);