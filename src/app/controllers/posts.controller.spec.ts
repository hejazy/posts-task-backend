import { Test } from '@nestjs/testing';
import { PostController } from '.';
import { PostService } from '../services';
import { Post } from '../models';
import { PassportModule } from '@nestjs/passport';

const mockService = () => ({
  filter: jest.fn(),
  findById: jest.fn(),
});

describe('Post Controller', () => {
  let controller;
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'basic' })],
      controllers: [PostController],
      providers: [
        { provide: PostService, useFactory: mockService },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });
  it('filter Post', async () => {
    const expectedResult = [new Post()];
    jest.spyOn(service, 'filter').mockResolvedValue(expectedResult);
    expect(await controller.query('query')).toBe(expectedResult);
  });
  it('find Post By Id', async () => {
    const expectedResult = new Post();
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
    expect(await controller.findById('the id')).toBe(expectedResult);
  });
});
