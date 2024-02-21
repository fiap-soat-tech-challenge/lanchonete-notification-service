import { Injectable } from '@nestjs/common';
import { ClientsService } from '../../domain/services/clients.service';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';
import { Cliente } from '../../domain/model/cliente';

@Injectable()
export class ClientsServiceImpl implements ClientsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async getClientByCpf(clienteCpf: string): Promise<Cliente> {
    const clientsUrl = this.configService.get('CLIENTS_SERVICE_URL');
    const response = await this.httpClientService.get(
      `${clientsUrl}/api/clientes/${clienteCpf}`,
    );
    return new Cliente(
      response.data.nome,
      response.data.cpf,
      response.data.email,
      response.data.telefone,
    );
  }
}
