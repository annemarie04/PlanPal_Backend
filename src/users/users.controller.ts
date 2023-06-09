import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IdentityCheckGuard } from 'src/other-guards/indentity-check.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all') // for testing purpose only, needs to be deleted
  getAllUsers() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findByEmail(@Req() req, @Param('email') email: string) {
    const userID = req.user.userId;
    return this.usersService.findByEmail(email);
  }
  
  @UseGuards(JwtAuthGuard, IdentityCheckGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, IdentityCheckGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
