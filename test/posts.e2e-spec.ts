import { Test } from '@nestjs/testing';
import {
  Post
} from '../src/app/Models';
import request from 'supertest';
import { PostController } from '../src/app/controllers';
import {
  PostService,

} from '../src/app/services';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DBService } from '../src/lib/database/database.service';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './auth/Basic.strategy';

describe('Post (e2e)', () => {
  let app: NestExpressApplication;
  let dbService;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
      controllers: [PostController],
      providers: [
        PostService,
        BasicStrategy,
        DBService,
      ],
    }).compile();
    app = moduleFixture.createNestApplication(new ExpressAdapter());
    dbService = moduleFixture.get<DBService>(DBService);
    dbService.find = () => ([new Post('TEST')])
    dbService.findOne = () => (new Post('TEST'))
    await app.init();
  });
  afterAll(async () => { await app.close() });
  describe('/posts (GET)', () => {
    it('correct request', async () => {
      let res: any = await request(app.getHttpServer())
        .get('/posts')
        .set('Authorization', 'Basic VGVzdFVzZXI6N2F1ZXBGNm5ZcUZoSg==')
        .expect(200)
      res = res.text && (JSON.parse(res.text));
      expect(JSON.parse(JSON.stringify([new Post('TEST')]))).toEqual(res);
    });
    it('bad request', () => {
      return request(app.getHttpServer())
        .get('/posts?id=wrongId')
        .set('Authorization', 'Basic VGVzdFVzZXI6N2F1ZXBGNm5ZcUZoSg==')
        .expect(400)
    });
    it('unAuthenticated request', () => {
      return request(app.getHttpServer())
        .get('/posts')
        .set('Authorization', 'Basic-wrong-token')
        .expect(401)
    });
  })

  describe('/posts/${id} (GET)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .get('/posts/1')
        .set('Authorization', 'Basic VGVzdFVzZXI6N2F1ZXBGNm5ZcUZoSg==')
        .expect(200)
        .expect(JSON.stringify(new Post('TEST')));
    });
    it('unAuthenticated request', () => {
      return request(app.getHttpServer())
        .get('/posts/1')
        .set('Authorization', 'Basic-wrong-token')
        .expect(401)
    });
  })

});
