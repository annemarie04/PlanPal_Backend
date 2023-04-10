import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { TaskSchema } from './schema/tasks.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
