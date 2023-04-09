import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop()
  date: Date;

  @Prop()
  dateCreated: Date;

  @Prop()
  lastEdited: Date;
}

export const UserSchema = SchemaFactory.createForClass(Task);