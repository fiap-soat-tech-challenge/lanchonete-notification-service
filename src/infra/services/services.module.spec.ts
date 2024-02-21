import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from './services.module';
import { HttpClientService } from './http-client.service';
import { NotifyClienteServiceImpl } from './notify-cliente.service.impl';
import { ClientsServiceImpl } from './clients.service.impl';
import { OrderServiceImpl } from './order.service.impl';

jest.mock('./http-client.service');
jest.mock('./notify-cliente.service.impl');
jest.mock('./clients.service.impl');
jest.mock('./order.service.impl');

describe('ServicesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ServicesModule],
      providers: [
        HttpClientService,
        NotifyClienteServiceImpl,
        ClientsServiceImpl,
        OrderServiceImpl,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  describe('HttpClientService', () => {
    it('should be defined', () => {
      const service = module.get<HttpClientService>(HttpClientService);
      expect(service).toBeDefined();
    });
  });

  describe('NotifyClienteServiceImpl', () => {
    it('should be defined', () => {
      const service = module.get<NotifyClienteServiceImpl>(
        NotifyClienteServiceImpl,
      );
      expect(service).toBeDefined();
    });
  });

  describe('ClientsServiceImpl', () => {
    it('should be defined', () => {
      const service = module.get<ClientsServiceImpl>(ClientsServiceImpl);
      expect(service).toBeDefined();
    });
  });

  describe('OrderServiceImpl', () => {
    it('should be defined', () => {
      const service = module.get<OrderServiceImpl>(OrderServiceImpl);
      expect(service).toBeDefined();
    });
  });
});
