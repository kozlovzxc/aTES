import { Injectable } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class RedisService {
  client: RedisClient;

  constructor() {
    this.client = createClient({
      url: 'redis://cache:6379',
    });
    this.client.on('error', (error) => {
      console.error(error);
      throw new Error('There are some issues with redis');
    });
  }
}
