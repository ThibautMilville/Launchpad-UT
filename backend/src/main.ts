import {NestFactory} from '@nestjs/core'
import {AppModule} from './config/app.module'
import {AppDataSource} from './ormconfig'
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  try {
    const app = await NestFactory.create(AppModule)
    try {
      await AppDataSource.initialize()
    } catch (dbError) {
      console.error('Database initialization failed, using fallback data:', dbError)
    }

    app.enableCors({
      origin: ['https://launchpad-ut.vercel.app', 'http://localhost:5173', 'https://localhost:5173', 'https://launchpad-ut-backend.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: false,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Content-Disposition'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })

    // Add a health check endpoint
    app.use('/', (req, res, next) => {
      if (req.path === '/') {
        return res.send({status: 'ok', message: 'API is running'})
      }
      next()
    })

    const port = process.env.PORT || 3000
    await app.listen(port)
  } catch (error) {
    console.error('Error during bootstrap:', error)
    process.exit(1)
  }
}

bootstrap()