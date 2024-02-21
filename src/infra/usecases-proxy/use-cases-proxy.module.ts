import { Module } from '@nestjs/common';
import { NotifyUseCases } from '../../usecases/notify.use.cases';
import { NotifyClienteService } from '../../domain/services/notify-cliente.service';
import { ServicesModule } from '../services/services.module';
import { NotifyClienteServiceImpl } from '../services/notify-cliente.service.impl';
import { OrderService } from '../../domain/services/order.service';
import { ClientsService } from '../../domain/services/clients.service';
import { OrderServiceImpl } from '../services/order.service.impl';
import { ClientsServiceImpl } from '../services/clients.service.impl';

const createNotifyUseCase = (
  orderService: OrderService,
  clientsService: ClientsService,
  notifyClienteService: NotifyClienteService,
) => {
  return new NotifyUseCases(orderService, clientsService, notifyClienteService);
};

@Module({
  imports: [ServicesModule],
  providers: [
    {
      provide: NotifyUseCases,
      useFactory: createNotifyUseCase,
      inject: [OrderServiceImpl, ClientsServiceImpl, NotifyClienteServiceImpl],
    },
  ],
  exports: [NotifyUseCases],
})
export class UseCasesProxyModule {}
