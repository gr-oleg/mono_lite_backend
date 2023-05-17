"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const user_model_1 = require("../users/user.model");
const cards_service_1 = require("../cards/cards.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, cardService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.cardService = cardService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        const token = this.generateToken(user);
        return token;
    }
    async signUp(userDto) {
        const candidate = await this.userService.getUserbyEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('Зайнято! -- Користувач з таким емейлом уже існує(', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        await this.cardService.createCard(user.user_id);
        const token = this.generateToken(user);
        return token;
    }
    async generateToken(user) {
        const payload = {
            id: user.user_id,
            email: user.email,
            first_name: user.first_name,
            second_name: user.second_name,
            imageURL: user.imageURL
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserbyEmail(userDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Як нема?! А де сі діло ?! -- Користувача з таким емейлом не існує');
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        if (!passwordEquals) {
            throw new common_1.UnauthorizedException('Йой.. А голову ти дома не забув(ла) -- Пароль не вірний:(');
        }
    }
    async refreshPage(dto) {
        const user = await this.userService.getUserById(dto.id);
        const token = this.generateToken(user);
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        cards_service_1.CardsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map