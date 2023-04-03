import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: createUserDto) {
        return this.authService.login(userDto)
   }
    @Post('/signUp')
    signUp(@Body() userDto: createUserDto) {
        return this.authService.signUp(userDto)
   }
    

}
