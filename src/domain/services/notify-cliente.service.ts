import { Cliente } from '../model/cliente';

export interface NotifyClienteService {
  send(message: string, cliente: Cliente): Promise<void>;
}
