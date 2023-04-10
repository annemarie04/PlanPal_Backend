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

  // Aici: primesc un parametru de forma CreateTaskDto, un userId si vreau sa introduc un obiect de tipul tasks.schema in baza de date
  create(createTaskDto: CreateTaskDto, userId: String) {

    // creez un obiect nou din care copiez atributele obiectului createTaskDto si setez field-ul de owner sa fie egal cu userId + updatez field-urile de createdAt si updatedAt
    const createdTask = new this.taskModel({...createTaskDto, owner: userId, createdAt: Date.now(), updatedAt: Date.now()}); 
    return createdTask.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  getAllByOwnerId(id: string) {
    return this.taskModel.find({ownerId: id});
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
