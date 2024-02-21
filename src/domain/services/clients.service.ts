import { Cliente } from '../model/cliente';

export interface ClientsService {
  getClientByCpf(clienteCpf: string): Promise<Cliente>;
}
