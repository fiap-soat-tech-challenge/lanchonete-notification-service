import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';

@Module({
  imports: [UseCasesProxyModule],
  controllers: [NotificationController],
})
export class RestModule {}
