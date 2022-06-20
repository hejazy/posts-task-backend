import { ApiProperty } from '@nestjs/swagger';
import { PostMock } from '../mocks';

export class Post {
  constructor(type?: string) {
    if (type === 'TEST') PostMock(this);
  }

  @ApiProperty({ description: 'accounting partner name', required: false })
  title?: string;

  @ApiProperty({ description: 'accounting partner status', required: false })
  body?: string;

  @ApiProperty({ description: 'record id', required: true, type: Number })
  id?: number;

  @ApiProperty({ description: 'user id', required: true, type: Number })
  userId?: number;

}