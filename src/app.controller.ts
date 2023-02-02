import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    async getRootMessage() {
      console.log("usao");
      return "Hello World!";
    }
}
