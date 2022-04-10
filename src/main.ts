import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);


  //Configurar Server port dinamico desde el archivo src/config/constants  
  const port = +configService.get<number>(SERVER_PORT);
  await app.listen(process.env.PORT || 3000);
  console.log(`listening on port = ${await app.getUrl()}`);
}
bootstrap();
