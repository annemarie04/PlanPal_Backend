import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRoot("mongodb+srv://moise_alexandru:1234@clusterplanpal.xqijxvb.mongodb.net/?retryWrites=true&w=majority"),
    TasksModule, 
    UsersModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
