import { NotifyUseCases } from './notify.use.cases';
import { OrderService } from '../domain/services/order.service';
import { ClientsService } from '../domain/services/clients.service';
import { NotifyClienteService } from '../domain/services/notify-cliente.service';
import { Pedido } from '../domain/model/pedido';
import { Cliente } from '../domain/model/cliente';

jest.mock('../domain/services/order.service');
jest.mock('../domain/services/clients.service');
jest.mock('../domain/services/notify-cliente.service');

describe('NotifyUseCases', () => {
  let orderService: jest.Mocked<OrderService>;
  let clientsService: jest.Mocked<ClientsService>;
  let notifyClienteService: NotifyClienteService;
  let notifyUseCases: NotifyUseCases;

  beforeEach(async () => {
    orderService = {
      getCpfClienteByOrderId: jest.fn(),
    } as jest.Mocked<OrderService>;

    clientsService = {
      getClientByCpf: jest.fn(),
    } as jest.Mocked<ClientsService>;

    notifyClienteService = {
      send: jest.fn(),
    } as jest.Mocked<NotifyClienteService>;

    notifyUseCases = new NotifyUseCases(
      orderService,
      clientsService,
      notifyClienteService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(notifyUseCases).toBeDefined();
  });

  describe('notify', () => {
    it('should notify the client for an approved payment', async () => {
      const pedido: Pedido = {
        pedidoId: 1,
        pagamentoId: 'payment123',
        valorTotal: 100,
        status: 'APROVADO',
      };

      const cpf = '12345678901';
      const cliente: Cliente = new Cliente(
        1,
        cpf,
        'John Doe',
        'john.doe@example.com',
        '123456789',
        new Date(),
      );

      jest.spyOn(orderService, 'getCpfClienteByOrderId').mockResolvedValue(cpf);
      jest.spyOn(clientsService, 'getClientByCpf').mockResolvedValue(cliente);
      jest.spyOn(notifyClienteService, 'send').mockResolvedValue(undefined);

      await notifyUseCases.notify(pedido);

      expect(orderService.getCpfClienteByOrderId).toHaveBeenCalledWith(
        pedido.pedidoId,
      );
      expect(clientsService.getClientByCpf).toHaveBeenCalledWith(cpf);
      expect(notifyClienteService.send).toHaveBeenCalledWith(
        expect.stringContaining(
          `[Aprovado] O pagamento do pedido com Id [${pedido.pedidoId}] foi aprovado!`,
        ),
        cliente,
      );
    });

    it('should throw an error for a declined payment', async () => {
      const pedido: Pedido = {
        pedidoId: 2,
        pagamentoId: 'payment456',
        valorTotal: 150,
        status: 'RECUSADO',
      };

      jest
        .spyOn(orderService, 'getCpfClienteByOrderId')
        .mockResolvedValue(null);

      await expect(notifyUseCases.notify(pedido)).rejects.toThrowError(
        'Cliente não cadastrado, não vou notificar!',
      );

      expect(orderService.getCpfClienteByOrderId).toHaveBeenCalledWith(
        pedido.pedidoId,
      );
    });

    it('should generate the correct message for RECUSADO status', () => {
      const pedido: Pedido = {
        pedidoId: 1,
        pagamentoId: 'payment123',
        valorTotal: 100,
        status: 'RECUSADO',
      };

      const expectedResult = `[Recusado] O pagamento do pedido com Id [${pedido.pedidoId}] foi recusado! Por favor verifique o pagamento.`;

      const result = notifyUseCases['_getMessage'](pedido);

      expect(result).toEqual(expectedResult);
    });
  });
});
