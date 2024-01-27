import { Get, Controller, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  render() {
    const message = this.appService.getHello();
    return { message };
  }

  @Get('/test')
  async getHello(@Res() res: Response): Promise<any> {
    const message = this.appService.getHello();
    res.json({ message });
  }
}
