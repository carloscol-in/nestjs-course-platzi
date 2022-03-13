import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import config from 'src/config';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: process.env.MONGO_INITDB_ROOT_USERNAME,
    //   password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    //   dbName: 'platzi-store',
    // })
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          host,
          connection,
          username,
          password,
          port,
          db,
        } = configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          dbName: db
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: 'hello',
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          host,
          connection,
          username,
          password,
          port,
          db,
        } = configService.mongo;
        
        let userInfo = '';
        if (username && password) {
          userInfo = `${username}:${password}@`;
        }

        const uri =
          `${connection}://${userInfo}${host}:${port}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(db);
        return database;
      },
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
