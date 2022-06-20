import { Module } from '@nestjs/common';
import { PostController } from '../controllers';
import { PostService } from '../services';
import { PassportModule } from '@nestjs/passport';
import { DBService } from '../../lib/database/database.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic' }),
  ],
  providers: [
    DBService,
    PostService,
  ],
  controllers: [
    PostController,
  ],
  exports: [
    PostService,
  ]
})
export class PostModule { }
