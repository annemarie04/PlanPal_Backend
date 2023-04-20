import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type DeadlineDocument = HydratedDocument<Deadline>;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
export class Deadline {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop()
  date: Date;

  @Prop({type: [String]})
  tags: string[];
  

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({default: Date.now()})
  readonly createdAt: Date;

  @Prop({default: Date.now()})
  readonly updatedAt: Date;
}

export const DeadlineSchema = SchemaFactory.createForClass(Deadline);