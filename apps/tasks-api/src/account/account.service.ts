import { Injectable } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib/callback_api';

@Injectable()
export class AccountService {
  EXCHANGE = 'accounts-stream';
  connection: Connection;
  channel: Channel;

  constructor() {
    connect('amqp://broker', (connectionError, connection) => {
      if (connectionError != null) {
        throw new Error("Can't connect to message broker");
      }
      this.connection = connection;

      this.connection.createChannel((channelError, channel) => {
        if (channelError != null) {
          throw new Error("Can't create broker channel");
        }
        this.channel = channel;

        this.channel.assertExchange(this.EXCHANGE, 'fanout', {
          durable: false,
        });

        console.log('created channel');

        this.channel.assertQueue(
          '',
          {
            exclusive: true,
          },
          (queueError, q) => {
            if (queueError) {
              throw new Error("Can't create broker queue");
            }

            console.log('asserted queue');

            channel.bindQueue(q.queue, this.EXCHANGE, '');

            channel.consume(
              q.queue,
              function (msg) {
                if (msg.content) {
                  console.log(' [x] %s', msg.content.toString());
                }
              },
              {
                noAck: true,
              },
            );
          },
        );
      });
    });
  }
}
