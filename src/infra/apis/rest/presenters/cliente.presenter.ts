import { Cliente } from '../../../../domain/model/cliente';

export class ClientePresenter {
  readonly id: number;
  readonly cpf: string;
  readonly nome: string;
  readonly email: string;
  readonly telefone: string;
  readonly dataHoraCadastro: Date;

  public constructor(cliente: Cliente) {
    this.id = cliente.id;
    this.cpf = cliente.cpf;
    this.nome = cliente.nome;
    this.email = cliente.email;
    this.telefone = cliente.telefone;
    this.dataHoraCadastro = cliente.dataHoraCadastro;
  }
}
