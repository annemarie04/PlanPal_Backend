import { Injectable, NotFoundException } from '@nestjs/common';
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
  async createTask(createTaskDto: CreateTaskDto, userId: string) {
    // creez un obiect nou din care copiez atributele obiectului createTaskDto si setez field-ul de owner sa fie egal cu userId + updatez field-urile de createdAt si updatedAt
    const createdTask = new this.taskModel({...createTaskDto, owner: userId, createdAt: Date.now(), updatedAt: Date.now()}); 
    return await createdTask.save();
  }

  async getTasksByUserId(userId: string) : Promise <Task[]> {
    return await this.taskModel.find({owner: userId}); // returneaza lista cu taskurile care au atributul owner = userId
  }

  async getTaskById(taskId: string) : Promise <Task> {
    return await this.taskModel.findById(taskId);
  }

  async deleteTaskById(taskId: string) : Promise <Task | null> {
    return await this.taskModel.findByIdAndDelete(taskId);
  }

  async patchTaskById(taskId: string, updateTaskDto: UpdateTaskDto) : Promise <Task | null> {
    const task = await this.taskModel.findById(taskId);
    if(!task)
      throw new NotFoundException("Task with id ${taskId} not found");
    if(updateTaskDto.title)
      task.title = updateTaskDto.title;
    if(updateTaskDto.description)
      task.description = updateTaskDto.description;
    if(updateTaskDto.date)
      task.date = updateTaskDto.date;
    return await task.save();
  }

  async putTaskById(taskId: string, updateTaskDto: UpdateTaskDto) : Promise <Task | null> {
    const task = await this.taskModel.findById(taskId);
    if(!task)
      throw new NotFoundException("Task with id ${taskId} not found");
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.date = updateTaskDto.date;
    return await task.save();
  }
}
