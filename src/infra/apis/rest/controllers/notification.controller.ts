import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoDto } from '../dtos/pedido.dto';
import { NotifyUseCases } from '../../../../usecases/notify.use.cases';
import { Pedido } from '../../../../domain/model/pedido';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);
  constructor(private readonly notifyUseCases: NotifyUseCases) {}

  @RabbitSubscribe({
    queue: 'notificacoes_pagamentos',
  })
  async notificar(pedidoDto: PedidoDto): Promise<void> {
    this.logger.log(
      `[Notificando] PagamentoId: ${pedidoDto.pagamentoId} | PedidoId: ${pedidoDto.pedidoId} | Status do pedido ${pedidoDto.status}`,
    );
    await this.notifyUseCases.notify(
      new Pedido(
        pedidoDto.pagamentoId,
        pedidoDto.pedidoId,
        pedidoDto.valorTotal,
        pedidoDto.status,
      ),
    );
  }
}
