import { Test } from '@nestjs/testing';
import { DBService } from '../../lib/database/database.service';
import {
  PostService,
} from '.';
import {
  Post
} from '../models';

describe('Post Service', () => {
  let service;
  let dbService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostService,
        DBService,
       ],
    }).compile();
    service = module.get<PostService>(PostService);
    dbService = module.get<DBService>(DBService)
    service.move
  });
  it('find Post By Id', async () => {
    const id = 1;
    const expectedValue = new Post('TEST');
    dbService.findOne = ()=> expectedValue;
    expect(await service.findById({id})).toEqual(expectedValue);
  });

  it('filter Posts', async () => {
    const id = 1;
    const expectedValue = [new Post('TEST')];
    dbService.find = ()=> expectedValue;
    expect(await service.filter({filters: {id}})).toEqual(expectedValue);
  });
});
