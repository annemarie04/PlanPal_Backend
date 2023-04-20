import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-events.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { EventOwnerGuard } from './guard/events.guard';
import { IdentityCheckGuard } from 'src/other-guards/indentity-check.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(@Param('userId') userId:string, @Body() createEventDto: CreateEventDto) {
    return await this.eventsService.createEvent(createEventDto, userId);
  }

  @UseGuards(JwtAuthGuard, IdentityCheckGuard)
  @Get('all/:userId')
  async getAllByUserId(@Param('userId') userId: string, @Query('tags') tags: string | null) {
    let tagArray: string[] = [];
    if(tags && typeof tags === 'string') {
        tagArray = tags.split(',');
    }
    else if(Array.isArray(tags)) {
        tagArray = tags;
    }
    return await this.eventsService.getEventsByUserId(userId, tagArray);
  }

  @UseGuards(JwtAuthGuard, EventOwnerGuard)
  @Get('event/:eventId')
  async getEventById(@Param('eventId') eventId: string) {
    return await this.eventsService.getEventById(eventId);
  }

  @UseGuards(JwtAuthGuard, EventOwnerGuard)
  @Delete('event/:eventId')
  async deleteEventById(@Param('eventId') eventId: string) {
    return await this.eventsService.deleteEventById(eventId);
  }

  @UseGuards(JwtAuthGuard, EventOwnerGuard)
  @Patch('event/:eventId')
  async patchEventById(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventsService.patchEventById(eventId, updateEventDto);
  }

  @UseGuards(JwtAuthGuard, EventOwnerGuard)
  @Put('event/:eventId')
  async putEventById(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventsService.putEventById(eventId, updateEventDto);
  }

}
