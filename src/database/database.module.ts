import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: 'hello',
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
