import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EVENT_CLIENT',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: ['localhost:9092'],
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
