import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { HotelroomsModule } from './modules/hotelrooms/hotelrooms.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationModule } from './modules/reservations/reservation.module';
import { SocketModule } from './modules/socket/socket.module';
import { SupportModule } from './modules/support/support.module';
import { UserModule } from './modules/users/users.module';

let process;

@Module({
  imports: [
      //MongooseModule.forRoot(process.env.MONGO_URL),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          uri: config.get<string>('MONGODB_URI'),
        })
      }),
      ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
      EventEmitterModule.forRoot({
        wildcard: true,
        delimiter: '.',
        newListener: false,
        removeListener: false,
        maxListeners: 100,
        verboseMemoryLeak: false,
        ignoreErrors: false,
    }),
      UserModule,
      AuthModule,
      HotelsModule,
      HotelroomsModule,
      ReservationModule,
      SupportModule,
      SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
