import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'
import { FirstMiddleware } from './middlewares/first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL')
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(FirstMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}


// npm i dotenv 
// config folder
// 


// odm -> o document
// orm -> relacional -> relacionas