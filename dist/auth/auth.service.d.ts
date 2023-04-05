import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CardsService } from 'src/cards/cards.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private cardService;
    constructor(userService: UsersService, jwtService: JwtService, cardService: CardsService);
    private curToken;
    getUserInfoFromToken(): Promise<{
        id: any;
        email: any;
        first_name: any;
        second_name: any;
    }>;
    login(userDto: createUserDto): Promise<{
        token: string;
    }>;
    signUp(userDto: createUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
