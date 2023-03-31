import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')

export class AppController{

    constructor(private appSetvice: AppService){}

    @Get('/users')
    getUsers() {
        return this.appSetvice.getUsers()
    }
}