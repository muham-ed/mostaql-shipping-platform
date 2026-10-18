import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  public checkHealth() {
    return {
      status: 'ok',
      service: 'Mostaql Core API Gateway',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
