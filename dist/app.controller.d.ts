import { AppService } from "./app.service";
export declare class AppController {
    private appSetvice;
    constructor(appSetvice: AppService);
    getUsers(): {
        id: number;
        name: string;
    }[];
}
