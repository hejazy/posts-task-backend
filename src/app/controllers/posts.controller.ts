import { Get, UsePipes, Query, Param, Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JoiValidationPipe } from '../pipes';

import {
  PostQueryDTO, PostQuerySchema,
  IdSchema,
} from '../dto';

import { PostService } from '../services';


import { Post } from '../models';
import { CoreController } from '../../lib';

@ApiTags('Posts')
@Controller('posts')
export class PostController extends CoreController {
  constructor(private readonly postService: PostService) {super()}


  @Get()
  @UsePipes(new JoiValidationPipe({
    query: PostQuerySchema,
  }))
  @ApiResponse({
    status: 200,
    description: 'post response',
    type: [Post],
  })
  
  async query(
    @Query() filters: PostQueryDTO,
  ): Promise<Post[]> {
    return await this.postService.filter({filters});
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'post response',
    type: Post,
  })
  @UsePipes(new JoiValidationPipe({
    param: {
      id: IdSchema,
    },
  }))
  async findById(
    @Param('id') id: string,
  ): Promise<Post> {
    return await this.postService.findById({id: parseInt(id)});
  }

}
