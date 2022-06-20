import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { DBService } from '../../lib/database/database.service';
import { PostQueryDTO } from '../dto';
import { Post } from '../models';

@Injectable()
export class PostService {
  constructor(
    @Inject(forwardRef(() => DBService))  private readonly dbService: DBService,
  ) {}
  async findById({id} : {id: number}): Promise<Post> {
    const res = await this.dbService.findOne({collection: 'posts', search: {id}});
    if(!res) throw new NotFoundException();
    return res;
  }

  async filter({filters = {}} : {filters: PostQueryDTO})
  : Promise<Post[]> {
    const search = this.queryMaker(filters);
    return await this.dbService.find({collection: 'posts', search})
  }

  queryMaker(filters){
    const query: any = {};
    if(filters.id) query.id = parseInt(filters.id);
    if(filters.userId) query.userId = parseInt(filters.userId);
    if(filters.title) query.title = filters.title;
    return query;
  }
}
