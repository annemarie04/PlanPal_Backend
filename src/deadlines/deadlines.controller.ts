import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { DeadlinesService } from './deadlines.service';
import { CreateDeadlineDto } from './dto/create-deadline.dto';
import { UpdateDeadlineDto } from './dto/update-deadline.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeadlineOwnerGuard } from './guard/deadlines.guard';
import { IdentityCheckGuard } from 'src/other-guards/indentity-check.guard';


@Controller('deadlines')
export class DeadlinesController {
  constructor(private readonly deadlinesService: DeadlinesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(@Param('userId') userId:string, @Body() createDeadlineDto: CreateDeadlineDto) {
    return await this.deadlinesService.createDeadline(createDeadlineDto, userId);
  }

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
    return await this.deadlinesService.getDeadlinesByUserId(userId, tagArray);
  }

  @UseGuards(JwtAuthGuard, DeadlineOwnerGuard)
  @Get('deadline/:deadlineId')
  async getDeadlineById(@Param('deadlineId') deadlineId: string) {
    return await this.deadlinesService.getDeadlineById(deadlineId);
  }

  @UseGuards(JwtAuthGuard, DeadlineOwnerGuard)
  @Delete('deadline/:deadlineId')
  async deleteDeadlineById(@Param('deadlineId') deadlineId: string) {
    return await this.deadlinesService.deleteDeadlineById(deadlineId);
  }

  @UseGuards(JwtAuthGuard, DeadlineOwnerGuard)
  @Patch('deadline/:deadlineId')
  async patchDeadlineById(@Param('deadlineId') deadlineId: string, @Body() updateDeadlineDto: UpdateDeadlineDto) {
    return await this.deadlinesService.patchDeadlineById(deadlineId, updateDeadlineDto);
  }

  @UseGuards(JwtAuthGuard, DeadlineOwnerGuard)
  @Put('deadline/:deadlineId')
  async putDeadlineById(@Param('deadlineId') deadlineId: string, @Body() updateDeadlineDto: UpdateDeadlineDto) {
    return await this.deadlinesService.putDeadlineById(deadlineId, updateDeadlineDto);
  }

}
