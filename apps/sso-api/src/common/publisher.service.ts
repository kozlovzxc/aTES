import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib/callback_api';
import { nanoid } from 'nanoid';

// TODO: check if we can rewrite it using https://docs.nestjs.com/microservices/rabbitmq
// TODO: replace callback api with promise API
@Injectable()
export class PublisherService {
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
      });
    });
  }

  // TODO: add event type definition
  publish(topic: string, event: any) {
    this.channel.assertExchange(topic, 'fanout', {
      durable: false,
    });

    const eventId = nanoid();

    this.channel.publish(
      topic,
      '',
      Buffer.from(
        JSON.stringify({
          event_id: eventId,
          ...event,
        }),
      ),
    );
  }
}
