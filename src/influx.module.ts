import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDB } from '@influxdata/influxdb-client';

@Global()
@Module({
  providers: [
    {
      provide: 'INFLUX',
      useFactory: (cfg: ConfigService): InfluxDB => {
        const url = cfg.get<string>('INFLUX_URL');
        const token = cfg.get<string>('INFLUX_TOKEN');
        if (!url || !token) {
          throw new Error('INFLUX_URL and INFLUX_TOKEN must be defined');
        }
        return new InfluxDB({ url, token });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['INFLUX'],
})
export class InfluxModule {}
