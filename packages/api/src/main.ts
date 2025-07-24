import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // await app.listen(process.env.PORT ?? 3000)
  app.enableCors({
    origin: ['http://localhost:5173'], //backend
    credentials: true,
  })

  await app.listen(3000) //communicate with the PWA
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
}
// bootstrap()
bootstrap().catch(err => {
  console.error('Error during application bootstrap:', err)
})
