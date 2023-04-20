import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeadlineDto } from './dto/create-deadline.dto';
import { UpdateDeadlineDto } from './dto/update-deadline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deadline, DeadlineDocument } from './schema/deadlines.schema';

@Injectable()
export class DeadlinesService {
  constructor(@InjectModel(Deadline.name) private deadlineModel: Model<DeadlineDocument>) {}
  
  async createDeadline(createDeadlineDto: CreateDeadlineDto, userId: string) {
    const createdDeadline = new this.deadlineModel({...createDeadlineDto, owner: userId, createdAt: Date.now(), updatedAt: Date.now()});
    return await createdDeadline.save();
  }

  async getDeadlinesByUserId(userId: string, tags: string[] | null) : Promise <Deadline[]> {
    const deadlines = await this.deadlineModel.find({owner: userId});
    if(tags && tags.length > 0) {
      return deadlines.filter(deadline => tags.every(tag => deadline.tags.includes(tag)));
    }
    return deadlines;
  }

  async getDeadlineById(deadlineId: string): Promise<Deadline | null> {
    const deadline = await this.deadlineModel.findById(deadlineId);
    return deadline;
  }

  async deleteDeadlineById(deadlineId: string) : Promise <Deadline | null> {
    return await this.deadlineModel.findByIdAndDelete(deadlineId);
  }

  async patchDeadlineById(deadlineId: string, updateDeadlineDto: UpdateDeadlineDto) : Promise <Deadline | null> {
    const deadline = await this.deadlineModel.findById(deadlineId);
    if(!deadline)
      throw new NotFoundException("Deadline with id ${deadlineId} not found");
    if(updateDeadlineDto.title)
      deadline.title = updateDeadlineDto.title;
    if(updateDeadlineDto.description)
      deadline.description = updateDeadlineDto.description;
    if(updateDeadlineDto.date)
      deadline.date = updateDeadlineDto.date;
    if(updateDeadlineDto.tags)
      deadline.tags = updateDeadlineDto.tags;
    return await deadline.save();
  }

  async putDeadlineById(deadlineId: string, updateDeadlineDto: UpdateDeadlineDto) : Promise <Deadline | null> {
    const deadline = await this.deadlineModel.findById(deadlineId);
    if(!deadline)
      throw new NotFoundException("Deadline with id ${deadlineId} not found");
    deadline.title = updateDeadlineDto.title;
    deadline.description = updateDeadlineDto.description;
    deadline.date = updateDeadlineDto.date;
    deadline.tags = updateDeadlineDto.tags;
    return await deadline.save();
  }

}
