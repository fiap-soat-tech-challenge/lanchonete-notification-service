import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules/lib/dynamicModules';

@Injectable()
export class QueuesClientFactory
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}

  createModuleConfig(): Promise<RabbitMQConfig> | RabbitMQConfig {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');

    return {
      name: 'RabbitMQ Server',
      uri: `amqp://${user}:${password}@${host}:${port}`,
      queues: [
        {
          name: 'notificacoes_pagamentos',
          options: {
            durable: true,
          },
        },
      ],
      enableControllerDiscovery: true,
    };
  }
}
