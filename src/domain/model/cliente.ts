export class Cliente {
  private readonly _cpf: string;
  private readonly _nome: string;
  private readonly _email: string;
  private readonly _telefone: string;

  public constructor(
    cpf: string,
    nome: string,
    email: string,
    telefone: string,
  ) {
    this._cpf = cpf;
    this._nome = nome;
    this._email = email;
    this._telefone = telefone;
  }

  get cpf(): string {
    return this._cpf;
  }

  get nome(): string {
    return this._nome;
  }

  get email(): string {
    return this._email;
  }

  get telefone(): string {
    return this._telefone;
  }
}
