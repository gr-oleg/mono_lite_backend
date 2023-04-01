"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const dist_1 = require("@nestjs/swagger/dist");
const app_module_1 = require("./app.module");
const cors = require("cors");
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MonoLite')
        .setDescription('The simplest banking application')
        .setVersion('1.0.0')
        .addTag('Mono-Lite')
        .build();
    const document = dist_1.SwaggerModule.createDocument(app, config);
    dist_1.SwaggerModule.setup('/api/docs', app, document);
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    }));
    await app.listen(PORT, () => console.log(`Server is now going on port ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map