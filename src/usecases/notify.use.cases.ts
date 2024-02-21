import { NotifyClienteService } from '../domain/services/notify-cliente.service';
import { Pedido } from '../domain/model/pedido';
import { Cliente } from '../domain/model/cliente';
import { ClientsService } from '../domain/services/clients.service';
import { OrderService } from '../domain/services/order.service';

export class NotifyUseCases {
  constructor(
    private readonly orderService: OrderService,
    private readonly clientsService: ClientsService,
    private readonly notifyClienteService: NotifyClienteService,
  ) {}

  async notify(pedido: Pedido): Promise<void> {
    const cpf = await this._getClienteCpfPedido(pedido.pedidoId);
    if (!cpf) {
      throw new Error('Cliente não cadastrado, não vou notificar!');
    }

    const cliente = await this._getCliente(cpf);
    const message = this._getMessage(pedido);
    await this._sendNotification(message, cliente);
  }

  async _getClienteCpfPedido(pedidoId: number): Promise<string | null> {
    return await this.orderService.getCpfClienteByOrderId(pedidoId);
  }

  async _getCliente(cpf: string): Promise<Cliente> {
    return await this.clientsService.getClientByCpf(cpf);
  }

  _getMessage(pedido: Pedido): string {
    let message = '';
    switch (pedido.status) {
      case 'APROVADO':
        message = `[Aprovado] O pagamento do pedido com Id [${pedido.pedidoId}] foi aprovado!`;
        break;
      case 'RECUSADO':
        message = `[Recusado] O pagamento do pedido com Id [${pedido.pedidoId}] foi recusado! Por favor verifique o pagamento.`;
        break;
    }
    return message;
  }

  async _sendNotification(message: string, cliente: Cliente): Promise<void> {
    await this.notifyClienteService.send(message, cliente);
  }
}
