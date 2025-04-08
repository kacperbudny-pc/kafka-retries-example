import { Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { KafkaMaxRetryExceptionFilter } from 'src/kafka-exception-filter';

@Controller()
export class AppController {
  constructor(@Inject('EVENT_CLIENT') private client: ClientKafka) {}

  @Post()
  sendEvent() {
    this.client.emit('test', { message: 'test' });
  }

  @UseFilters(new KafkaMaxRetryExceptionFilter(2))
  @EventPattern('test')
  handleEvent() {
    throw new Error('test');
  }
}
