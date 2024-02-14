import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoDto } from './pedido.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @RabbitSubscribe({
    queue: 'notificacoes_pagamentos',
  })
  async notificar(pedidoDto: PedidoDto): Promise<void> {
    let message = '';
    switch (pedidoDto.status) {
      case 'APROVADO':
        message = `[Aprovado] Pedido com Id [${pedidoDto.pedidoId}] foi pago com sucesso!`;
        break;
      case 'RECUSADO':
        message = `[Recusado] Pedido com Id [${pedidoDto.pedidoId}] foi recusado!`;
        break;
    }
    this.logger.log(
      `[Notificando] ${message}\n Detalhes do pedido:\n ${JSON.stringify(pedidoDto, null, 4)} `,
    );
  }
}
