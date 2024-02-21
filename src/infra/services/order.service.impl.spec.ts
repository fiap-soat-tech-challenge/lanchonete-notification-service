import { Test, TestingModule } from '@nestjs/testing';
import { OrderServiceImpl } from './order.service.impl';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

jest.mock('./http-client.service');
jest.mock('@nestjs/config');

describe('OrderServiceImpl', () => {
  let orderService: OrderServiceImpl;
  let httpClientService: HttpClientService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderServiceImpl, HttpClientService, ConfigService],
    }).compile();

    orderService = module.get<OrderServiceImpl>(OrderServiceImpl);
    httpClientService = module.get<HttpClientService>(HttpClientService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('getCpfClienteByOrderId', () => {
    it('should get CPF by order Id', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';
      const responseData = {
        cpfCliente: '12345678901',
      };

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      } as AxiosResponse);

      const result = await orderService.getCpfClienteByOrderId(pedidoId);

      expect(result).toEqual('12345678901');
      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });

    it('should throw an error when the response status is not 200', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 400,
        data: {},
      } as AxiosResponse);

      await expect(
        orderService.getCpfClienteByOrderId(pedidoId),
      ).rejects.toThrow('Erro ao buscar pedido');

      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });
  });
});
