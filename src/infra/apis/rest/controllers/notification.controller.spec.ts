import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotifyUseCases } from '../../../../usecases/notify.use.cases';
import { PedidoDto } from '../dtos/pedido.dto';
import { Pedido } from '../../../../domain/model/pedido';

jest.mock('../../../../usecases/notify.use.cases');

describe('NotificationController', () => {
  let controller: NotificationController;
  let notifyUseCases: NotifyUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotifyUseCases],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notifyUseCases = module.get<NotifyUseCases>(NotifyUseCases);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('notificar', () => {
    it('should notify use cases with the provided PedidoDto', async () => {
      const pedidoDto: PedidoDto = {
        pagamentoId: 'payment123',
        pedidoId: 1,
        valorTotal: 100,
        status: 'APROVADO',
      };

      const mockedPedido = new Pedido(
        pedidoDto.pagamentoId,
        pedidoDto.pedidoId,
        pedidoDto.valorTotal,
        pedidoDto.status,
      );

      jest.spyOn(notifyUseCases, 'notify').mockResolvedValue(undefined);

      await controller.notificar(pedidoDto);

      expect(notifyUseCases.notify).toHaveBeenCalledWith(mockedPedido);
    });
  });
});
