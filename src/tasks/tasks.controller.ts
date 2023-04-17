import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TaskOwnerGuard } from './guard/tasks.guard';
import { IdentityCheckGuard } from 'src/other-guards/indentity-check.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Mai jos: un POST request de forma localhost:4000/tasks/:userId
  // tasks vine de la linia 6, iar :userId de mai jos
  // iau userId-ul si body-ul (care e de forma CreateTaskDto) si apelez serviciul respectiv

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(@Param('userId') userId:string, @Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto, userId);
  }


  // get-ul de mai jos se va apela astfel: localhost:4000/tasks/all/643c8ef35d8de24f27d4ec0d?tags=ceva,altceva
  //                                                                     userId              taguri(optional)
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
    return await this.tasksService.getTasksByUserId(userId, tagArray);
}

  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Get('task/:taskId')
  async getTaskById(@Param('taskId') taskId: string) {
    return await this.tasksService.getTaskById(taskId);
  }

  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Delete('task/:taskId')
  async deleteTaskById(@Param('taskId') taskId: string) {
    return await this.tasksService.deleteTaskById(taskId);
  }

  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Patch('task/:taskId')
  async patchTaskById(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.patchTaskById(taskId, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Put('task/:taskId')
  async putTaskById(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.putTaskById(taskId, updateTaskDto);
  }
  
}
