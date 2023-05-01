import { createUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    deleteUser(dto: createUserDto): Promise<string>;
}
