import { Module } from '@nestjs/common';
import { DeadlinesService } from './deadlines.service';
import { DeadlinesController } from './deadlines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deadline, DeadlineSchema } from './schema/deadlines.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Deadline.name, schema: DeadlineSchema}])],
  controllers: [DeadlinesController],
  providers: [DeadlinesService]
})
export class DeadlinesModule {}
