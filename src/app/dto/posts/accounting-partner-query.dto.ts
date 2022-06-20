import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class PostQueryDTO  {
  @ApiProperty({ description: 'post id', required: false })
  id?: string;

  @ApiProperty({ description: 'user id', required: false })
  userId?: string;

  @ApiProperty({ description: 'title', required: false })
  title?: string;
}

export const PostQuerySchemaFactory = () => {
  const schema: any = {
    id: Joi.number(),
    userId: Joi.number(),
    title: Joi.string(),
  }
  return Joi.object().keys(schema);
};
export const PostQuerySchema = PostQuerySchemaFactory();
