import { Injectable,HttpException,HttpCode,HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private cardService: CardsService,
  ) {}

  private curToken: Promise<{ token: string }>;

    

  async getUserInfoFromToken() {
    const decodedToken = await this.jwtService.verifyAsync(
       (await this.curToken).token,
    );
    const { id, email, first_name, second_name } = decodedToken;
    return { id, email, first_name, second_name };
  }
  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    const token = this.generateToken(user);
    this.curToken = token;
    return token;
  }
  async signUp(userDto: createUserDto) {
    const candidate = await this.userService.getUserbyEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Зайнято! -- Користувач з таким емейлом уже існує ',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    await this.cardService.createCard(user.user_id);
    const token = this.generateToken(user);
    this.curToken = token;
    return token;
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      second_name: user.second_name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: createUserDto) {
    const user = await this.userService.getUserbyEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException(
        'Як нема?! А де сі діло ?! -- Користувача з таким емейлом не існує',
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    if (!passwordEquals) {
      throw new UnauthorizedException(
        'Йой.. А голову ти дома не забув(ла) -- Пароль не вірний:('
      );
    }
  }
}
