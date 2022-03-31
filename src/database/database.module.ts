import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, password, host, database, port } =
          configService.postgres;
        return {
          type: 'postgres',
          username,
          password,
          database,
          host,
          port,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: 'hello',
    },
    // {
    //   provide: 'PG',
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const client = new Client(configService.postgres);

    //     client.connect();

    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
