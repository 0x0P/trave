import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private svc: MetricsService) {}
  @Get()
  getAll() {
    return this.svc.getAll();
  }
}
