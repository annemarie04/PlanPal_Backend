import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ActivityOwnerGuard } from './guard/activities.guard';
import { IdentityCheckGuard } from 'src/other-guards/indentity-check.guard';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(@Param('userId') userId:string, @Body() createActivityDto: CreateActivityDto) {
    return await this.activitiesService.createActivity(createActivityDto, userId);
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
    return await this.activitiesService.getActivitiesByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, ActivityOwnerGuard)
  @Get('activity/:activityId')
  async getActivityById(@Param('activityId') activityId: string) {
    return await this.activitiesService.getActivityById(activityId);
  }

  @UseGuards(JwtAuthGuard, ActivityOwnerGuard)
  @Delete('activity/:activityId')
  async deleteActivityById(@Param('activityId') activityId: string) {
    return await this.activitiesService.deleteActivityById(activityId);
  }

  @UseGuards(JwtAuthGuard, ActivityOwnerGuard)
  @Patch('activity/:activityId')
  async patchActivityById(@Param('activityId') activityId: string, @Body() updateActivityDto: UpdateActivityDto) {
    return await this.activitiesService.patchActivityById(activityId, updateActivityDto);
  }

  @UseGuards(JwtAuthGuard, ActivityOwnerGuard)
  @Put('activity/:activityId')
  async putActivityById(@Param('activityId') activityId: string, @Body() updateActivityDto: UpdateActivityDto) {
    return await this.activitiesService.putActivityById(activityId, updateActivityDto);
  }
}
