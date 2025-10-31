// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as express from 'express';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // ✅ Make uploaded files accessible
// app.use('/public', express.static(join(__dirname, '..', 'public')));

//   await app.listen(process.env.PORT || 3001);

//   console.log('🚀 Server running at http://localhost:3001');
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 👈 uses Express by default

  // ✅ Serve static files from "public"
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(3001);
  console.log(`🚀 Server running at http://localhost:3001`);
}
bootstrap();
