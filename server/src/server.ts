import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import { config } from "./utils/config.provider";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const port = config.app.port;
  await app.listen(port);
}

bootstrap();
