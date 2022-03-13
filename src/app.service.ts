import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from 'src/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! api key: ${apiKey}, db: ${dbName}`;
  }

  async getTasks() {
    const tasksCollection = this.database.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    return tasks;
  }
}
