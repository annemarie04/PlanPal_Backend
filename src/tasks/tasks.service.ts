import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { TaskDocument } from './schema/tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
