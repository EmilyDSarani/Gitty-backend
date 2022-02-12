const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

const agent = request.agent(app);

describe('Gitty Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should redirect to github oauth on login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback&scope=user/i
    );
  });

  it('should login and redirect users', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=19')
      .redirects(1);
    
    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'Sauron_Number_One',
      email: 'eye.sauron@mordor.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('posts a post for user', async () => {
    const user = await agent
      .get('/api/v1/github/login/callback?code=19')
      .redirects(1);
    const postPosty = await agent.post('/api/v1/posts').send({
      message:'I am looking for the one ring, lost it in an unfornutate event',
      userId: user.body.id
    });
    expect(postPosty.body).toEqual({
      postId: expect.any(String),
      message:'I am looking for the one ring, lost it in an unfornutate event',
      createdAt: expect.any(String),
      userId: expect.any(String),
    });
  });

  it('gets posts for logged in user', async () => {
    const agent = request.agent(app);
    const req = await agent
      .get('/api/v1/posts')
      .redirects(1);

    expect(req.body).toEqual([]);
  });

});
