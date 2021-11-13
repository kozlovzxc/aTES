import { Injectable } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib/callback_api';
import { RedisService } from '../common/services/redis.service';

// TODO: replace callback api with promise API
@Injectable()
export class AuthService {
  EXCHANGE = 'auth-stream';
  connection: Connection;
  channel: Channel;

  constructor(private redisService: RedisService) {
    connect('amqp://broker', (connectionError, connection) => {
      if (connectionError != null) {
        throw new Error("Can't connect to broker");
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

        this.channel.assertQueue(
          '',
          {
            exclusive: true,
          },
          (queueError, q) => {
            if (queueError) {
              throw new Error("Can't create broker queue");
            }

            channel.bindQueue(q.queue, this.EXCHANGE, '');

            channel.consume(
              q.queue,
              (msg) => {
                if (msg.content) {
                  const event = JSON.parse(msg.content.toString());
                  this.redisService.client.SET(
                    event.data.accessToken,
                    event.data.publicId,
                  );
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
