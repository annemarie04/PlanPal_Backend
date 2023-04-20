import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schema/events.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}
  
  async createEvent(createEventDto: CreateEventDto, userId: string) {
    const createdEvent = new this.eventModel({...createEventDto, owner: userId, createdAt: Date.now(), updatedAt: Date.now()});
    return await createdEvent.save();
  }

  async getEventsByUserId(userId: string, tags: string[] | null) : Promise <Event[]> {
    const events = await this.eventModel.find({owner: userId});
    if(tags && tags.length > 0) {
      return events.filter(event => tags.every(tag => event.tags.includes(tag)));
    }
    return events;
  }


  async getEventById(eventId: string): Promise<Event | null> {
    const event = await this.eventModel.findById(eventId);
    return event;
  }

  async deleteEventById(eventId: string) : Promise <Event | null> {
    return await this.eventModel.findByIdAndDelete(eventId);
  }

  async patchEventById(eventId: string, updateEventDto: UpdateEventDto) : Promise <Event | null> {
    const event = await this.eventModel.findById(eventId);
    if(!event)
      throw new NotFoundException("Event with id ${eventId} not found");
    if(updateEventDto.title)
      event.title = updateEventDto.title;
    if(updateEventDto.description)
      event.description = updateEventDto.description;
    if(updateEventDto.start_date)
      event.start_date = updateEventDto.start_date;
    if(updateEventDto.end_date)
      event.end_date = updateEventDto.end_date;
    if(updateEventDto.tags)
      event.tags = updateEventDto.tags;
    return await event.save();
  }

  async putEventById(eventId: string, updateEventDto: UpdateEventDto) : Promise <Event | null> {
    const event = await this.eventModel.findById(eventId);
    if(!event)
      throw new NotFoundException("Event with id ${eventId} not found");
    event.title = updateEventDto.title;
    event.description = updateEventDto.description;
    event.start_date = updateEventDto.start_date;
    event.end_date = updateEventDto.end_date;
    event.tags = updateEventDto.tags;
    return await event.save();
  }

}
