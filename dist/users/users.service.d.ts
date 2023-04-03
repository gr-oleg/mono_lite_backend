import { createUserDto } from './dto/create-user.dto';
import { User } from './user.model';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: createUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(user_id: number): Promise<User>;
    getUserbyEmail(email: string): Promise<User>;
}
