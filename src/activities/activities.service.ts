import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schema/activities.schema';

@Injectable()
export class ActivitiesService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) {}

  async createActivity(createActivityDto: CreateActivityDto, userId: string) {
    const createdActivity = new this.activityModel({...createActivityDto, owner: userId, createdAt: Date.now(), updatedAt: Date.now()});
    return await createdActivity.save();
  }

  async getActivitiesByUserId(userId: string, tags: string[] | null) : Promise <Activity[]> {
    const activities = await this.activityModel.find({owner: userId});
    if(tags && tags.length > 0) {
      return activities.filter(activity => tags.every(tag => activity.tags.includes(tag)));
    }
    return activities;
  }

  async getActivityById(activityId: string): Promise<Activity | null> {
    const activity = await this.activityModel.findById(activityId);
    return activity;
  }

  async deleteActivityById(activityId: string) : Promise <Activity | null> {
    return await this.activityModel.findByIdAndDelete(activityId);
  }

  async patchActivityById(activityId: string, updateActivityDto: UpdateActivityDto) : Promise <Activity | null> {
    const activity = await this.activityModel.findById(activityId);
    if(!activity)
      throw new NotFoundException("Activity with id ${activityId} not found");
    if(updateActivityDto.title)
      activity.title = updateActivityDto.title;
    if(updateActivityDto.description)
      activity.description = updateActivityDto.description;
    if(updateActivityDto.start_date)
      activity.start_date = updateActivityDto.start_date;
    if(updateActivityDto.end_date)
      activity.end_date = updateActivityDto.end_date;
    if(updateActivityDto.tags)
      activity.tags = updateActivityDto.tags;
    return await activity.save();
  }

  async putActivityById(activityId: string, updateActivityDto: UpdateActivityDto) : Promise <Activity | null> {
    const activity = await this.activityModel.findById(activityId);
    if(!activity)
      throw new NotFoundException("Activity with id ${activityId} not found");
    activity.title = updateActivityDto.title;
    activity.description = updateActivityDto.description;
    activity.start_date = updateActivityDto.start_date;
    activity.end_date = updateActivityDto.end_date;
    activity.tags = updateActivityDto.tags;
    return await activity.save();
  }
  
}
