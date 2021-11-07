import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherService {
  publish(topic: string, name: string, data: any) {
    console.log(topic, name, data);
  }
}
