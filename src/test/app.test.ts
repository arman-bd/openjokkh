import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import app from '../api/app';
import { expect } from 'chai';
import { APIKey } from '../api/entities/APIKey';
import { Challenge } from '../api/entities/Challenge';

before(async () => {
  const connection = await createConnection({
    type: "sqlite",
    database: "./data/openjokkh_test.db",
    synchronize: true,
    logging: false,
    entities: [
      APIKey,
      Challenge
    ],
  });
  app.locals.connection = connection;
});

after(async () => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
});

describe('OpenJokkh API', () => {
  it('should generate a new challenge token', async () => {
    const res = await request(app)
      .get('/api/v1/challenge')
      .expect(200);

    expect(res.body).to.have.property('challengeToken');
  });

  it('should validate captcha response', async () => {
    const connection = getConnection();
    const apiKeyRepository = connection.getRepository(APIKey);

    // Insert a valid API key for testing
    const apiKey = 'test-api-key';
    await apiKeyRepository.save(new APIKey(apiKey));

    // Get a challenge token
    const challengeRes = await request(app)
      .get('/api/v1/challenge')
      .expect(200);

    const challengeToken = challengeRes.body.challengeToken;

    // Validate captcha response
    const res = await request(app)
      .post('/api/v1/validate')
      .send({
        apiKey: apiKey,
        challengeToken: challengeToken,
        captchaResponse: 'checkbox_clicked'
      })
      .expect(200);

    expect(res.body).to.have.property('success', true);
  });

  it('should fail validation with invalid captcha response', async () => {
    const connection = getConnection();
    const apiKeyRepository = connection.getRepository(APIKey);

    // Insert a valid API key for testing
    const apiKey = 'test-api-key';
    await apiKeyRepository.save(new APIKey(apiKey));

    // Get a challenge token
    const challengeRes = await request(app)
      .get('/api/v1/challenge')
      .expect(200);

    const challengeToken = challengeRes.body.challengeToken;

    // Validate captcha response
    const res = await request(app)
      .post('/api/v1/validate')
      .send({
        apiKey: apiKey,
        challengeToken: challengeToken,
        captchaResponse: 'invalid_response'
      })
      .expect(400);

    expect(res.body).to.have.property('success', false);
  });
});
