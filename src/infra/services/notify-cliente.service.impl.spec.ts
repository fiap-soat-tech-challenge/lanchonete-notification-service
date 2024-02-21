import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Cliente } from '../../domain/model/cliente';
import { NotifyClienteServiceImpl } from './notify-cliente.service.impl';

jest.mock('nodemailer');

describe('NotifyClienteServiceImpl', () => {
  let service: NotifyClienteServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotifyClienteServiceImpl,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked_value'),
          },
        },
      ],
    }).compile();

    service = module.get<NotifyClienteServiceImpl>(NotifyClienteServiceImpl);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send', () => {
    it('should send notification email', async () => {
      const mockedTransporter = {
        sendMail: jest.fn().mockResolvedValue(undefined),
      };

      (service as any).transporter = mockedTransporter;

      const cliente: Cliente = new Cliente(
        '12345678901',
        'John Doe',
        'john.doe@example.com',
        '123456789',
      );

      const message = 'Test message';

      await service.send(message, cliente);

      expect(mockedTransporter.sendMail).toHaveBeenCalledWith({
        from: 'lanchonete-app@mail.com',
        to: cliente.email,
        subject: 'Notificação de pagamento do Pedido',
        text: message,
        html: `<p>${message}</p>`,
      });
    });
  });
});
