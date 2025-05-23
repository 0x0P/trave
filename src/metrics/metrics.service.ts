import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';

@Injectable()
export class MetricsService {
  private qApi: QueryApi;
  private bucket: string;

  constructor(
    @Inject('INFLUX') private influx: InfluxDB,
    cfg: ConfigService,
  ) {
    const org = cfg.get<string>('INFLUX_ORG');
    this.bucket = cfg.get<string>('INFLUX_BUCKET') || '';
    if (!org) {
      throw new Error('INFLUX_ORG must be defined');
    }
    if (!this.bucket) {
      throw new Error('INFLUX_BUCKET must be defined');
    }
    this.qApi = this.influx.getQueryApi(org);
  }

  async getAll(): Promise<Record<string, any>[]> {
    const flux = `from(bucket:"${this.bucket}") |> range(start: -1h)`;
    const rows = await this.qApi.collectRows<Record<string, any>>(flux);
    return rows;
  }
}
