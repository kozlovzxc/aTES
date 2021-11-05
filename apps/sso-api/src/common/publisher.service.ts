import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherService {
  publish(event) {
    console.log(event);
  }
}
