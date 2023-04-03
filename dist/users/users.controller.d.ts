import { CardsService } from 'src/cards/cards.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    readonly cardService: CardsService;
    constructor(usersService: UsersService, cardService: CardsService);
    create(userDto: createUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getCardById(user_id: number): Promise<User>;
}
