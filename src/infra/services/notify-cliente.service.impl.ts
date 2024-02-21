import { Injectable, Logger } from '@nestjs/common';
import { NotifyClienteService } from '../../domain/services/notify-cliente.service';
import { Cliente } from '../../domain/model/cliente';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotifyClienteServiceImpl implements NotifyClienteService {
  private readonly logger = new Logger(NotifyClienteServiceImpl.name);

  private transporter: any;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: parseInt(configService.get('MAIL_PORT')),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    });
  }

  async send(message: string, cliente: Cliente): Promise<void> {
    const html = `<p>${message}</p>`;
    await this._sendMail(
      cliente.email,
      'Notificação de pagamento do Pedido',
      message,
      html,
    );
  }

  async _sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    this.logger.log(`Enviando notificação para o cliente`);
    const mailOptions = {
      from: 'lanchonete-app@mail.com',
      to,
      subject,
      text,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
