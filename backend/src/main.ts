import {NestFactory} from '@nestjs/core'
import {AppModule} from './config/app.module'
import {AppDataSource} from './ormconfig'

async function bootstrap() {
  await AppDataSource.initialize()

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['https://launchpad-ut.vercel.app', 'http://localhost:5173', 'https://launchpad-ut-backend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Disposition'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap().catch(error => {
  console.error('Error during bootstrap:', error)
  process.exit(1)
})