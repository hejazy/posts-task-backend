import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from './app/auth';
import { PostModule } from './app/modules';

import { DatabaseModule } from './lib';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => PostModule),
    AuthModule,
  ]
})
export class AppModule {}