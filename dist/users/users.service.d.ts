import { createUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/logIn-user.dto';
import { User } from './user.model';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: createUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(user_id: number): Promise<User>;
    getUserbyEmail(dto: LogInUserDto): Promise<User>;
}
