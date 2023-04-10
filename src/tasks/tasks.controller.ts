import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Mai jos: un POST request de forma localhost:4000/tasks/:userId
  // tasks vine de la linia 6, iar :userId de mai jos
  // iau userId-ul si body-ul (care e de forma CreateTaskDto) si apelez serviciul respectiv  
  @Post(':userId')
  create(@Param('userId') userId:string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('userid')
  getAllByUsername(@Param('userid') id: string) {
    return this.tasksService.getAllByOwnerId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
