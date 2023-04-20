import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema({
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })
export class Event {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop()
    start_date: Date;

    @Prop()
    end_date: Date;

    @Prop({type: [String]})
    tags: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({default: Date.now()})
    readonly createdAt: Date;

    @Prop({default: Date.now()})
    readonly updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);