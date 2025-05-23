import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfluxModule } from './influx.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfluxModule,
    MetricsModule,
  ],
})
export class AppModule {}
