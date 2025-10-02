
import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module'

async function basic(){
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 4000
  await app.listen(PORT);
}

basic()