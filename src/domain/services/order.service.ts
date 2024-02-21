export interface OrderService {
  getCpfClienteByOrderId(pedidoId: number): Promise<string | null>;
}
