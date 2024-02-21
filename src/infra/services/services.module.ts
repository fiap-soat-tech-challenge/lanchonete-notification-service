import { Module } from '@nestjs/common';
import { NotifyClienteServiceImpl } from './notify-cliente.service.impl';
import { ClientsServiceImpl } from './clients.service.impl';
import { OrderServiceImpl } from './order.service.impl';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';

@Module({
  imports: [HttpModule],
  providers: [
    HttpClientService,
    NotifyClienteServiceImpl,
    ClientsServiceImpl,
    OrderServiceImpl,
  ],
  exports: [
    HttpClientService,
    NotifyClienteServiceImpl,
    ClientsServiceImpl,
    OrderServiceImpl,
  ],
})
export class ServicesModule {}
