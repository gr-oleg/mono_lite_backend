import { Injectable,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { createUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/logIn-user.dto';
import { User } from './user.model';

import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
  async getUserById(user_id: number) {
    const users = await this.userRepository.findByPk(user_id);
    return users;
  }
  async getUserbyEmail(dto: LogInUserDto){
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      }
    })
    if (!user) {
        throw new HttpException('Не шукай того кого нема) -- Здається неправильно ввели емейл!', HttpStatus.BAD_REQUEST);
      }
 
    
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Але то вже безголовe -- неправильний пароль!');  
    }
    return user;
  }
}
