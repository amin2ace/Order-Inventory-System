import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvConfigModule } from './envconfig.module';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'RABBITMQ_SERVICE',
          imports: [EnvConfigModule],
          inject: [ConfigService],
          useFactory(configService: ConfigService) {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
                queue: configService.getOrThrow<string>('RABBITMQ_QUEUE'),
                queueOptions: {
                  durable: true,
                },
              },
            };
          },
        },
      ],
    }),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {}
