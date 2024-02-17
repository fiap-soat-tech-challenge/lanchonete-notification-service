<br />
<div align="center">
  <h3 align="center">Lanchonete Notification Service</h3>
</div>

## Sobre

Este é um serviço de notificação para a lanchonete. Ele é responsável por enviar notificações para os clientes.

Como ainda não é necessário enviar notificações para os clientes, o serviço está apenas simulando o consumo das 
mensagens de notificações dos demais serviços.

## Começando

Para executar o projeto localmente siga as próximas etapas.

### Pré-requisitos

* Docker com compose
  Veja a [documentação](https://docs.docker.com/engine/install/) para instalar o docker no seu sistema se ainda não tiver instalado.

### Instalação

A instalação é bem simples, siga as seguintes etapas:

1. Clone o repositório
   ```sh
   git clone https://github.com/fiap-soat-tech-challenge/lanchonete-notification-service
   ```
2. Entre na pasta do projeto
   ```sh
   cd lanchonete-notification-service
   ```
3. Agora execute o projeto usando o docker compose
   ```sh
   docker compose up -d
   ```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## SAGA Pattern - Coreografia

Utilizamos a estratégia **coreografia**.

Decidimos utilizar a estratégia **coreografia** por ser mais simples e ter um acoplamento fraco entre os serviços. Assim,
pensando nos próximos passos, a evolução dos microsserviços se torna mais tranquila já que os mesmos vão estar sem
acoplamento com os demais e poderemos também ao ponto que aumentamos o time (de desenvolvedores) dividir a sub times,
o que vai facilitar o crescimento do time. Assim, por ser mais simples do que a estratégia orquestração, podemos
implementar mais rapidamente, e com isso entregar uma primeira versão do software mais rápido.

No futuro com a evolução, do software, do time, e mudanças no negócio (possivelmente) podemos pensar em utilizar a
orquestração, mas no momento é mais vantajoso usarmos a estratégia **coreografia**. Assim cada serviço sabe qual
evento disparar e qual evento deve ouvir para que a saga seja completa.

## Zap Scanning Reports

Os relatórios de segurança do ZAP Scanning estão disponíveis no diretório `zap-reports` dos repositórios dos serviços
correspondentes, para acessar os relatórios clique nos links abaixo:

- **[Zap Reports de Listar Cardápio e Realização do Pedido](https://github.com/fiap-soat-tech-challenge/lanchonete-order-service?tab=readme-ov-file#zap-scanning-reports)**
- **[Zap Reports de Geração do Pagamento e Confirmação do Pagamento](https://github.com/fiap-soat-tech-challenge/lanchonete-payment-service?tab=readme-ov-file#zap-scanning-reports)**

## Relatório RIPD do sistema

Link para o relatório RIPD do sistema: **[Relatório RIPD](https://docs.google.com/document/d/1hBpNQ4Gs5mKzRf0FAM85vzqWiXM7idFJF5sMvlN9cy0/preview)**.

## Diagrama da Arquitetura

![Diagrama da Arquitetura](https://github.com/fiap-soat-tech-challenge/terraform-lanchonete-app/blob/main/docs/imagens/infra_aws_app.png)