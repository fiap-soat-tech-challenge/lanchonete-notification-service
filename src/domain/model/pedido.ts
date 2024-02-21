export class Pedido {
  pagamentoId: string;
  pedidoId: number;
  valorTotal: number;
  status: string;

  constructor(
    pagamentoId: string,
    pedidoId: number,
    valorTotal: number,
    status: string,
  ) {
    this.pagamentoId = pagamentoId;
    this.pedidoId = pedidoId;
    this.valorTotal = valorTotal;
    this.status = status;
  }
}