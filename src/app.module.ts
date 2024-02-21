import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './infra/health/health.module';
import { QueuesModule } from './infra/queues/queues.module';
import { RestModule } from './infra/apis/rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestModule,
    HealthModule,
    QueuesModule,
  ],
})
export class AppModule {}
