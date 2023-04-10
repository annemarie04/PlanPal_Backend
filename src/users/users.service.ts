import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword =  await this.hashPassword(createUserDto.password);
    let newUser = new User();
    console.log(createUserDto);

    newUser = {...createUserDto, password: hashedPassword};
    console.log(newUser);
    const userToAdd = new this.userModel(newUser);
    return userToAdd.save();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email: email});
  }

  /*
  updatePassword(email: string) {
    const 
  }
  */
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
