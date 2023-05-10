import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async getRootMessage() {
    return 'Hello World!';
  }
}
