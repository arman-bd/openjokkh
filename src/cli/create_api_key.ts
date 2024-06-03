import 'reflect-metadata';
import { createConnection } from 'typeorm';
import crypto from 'crypto';
import { APIKey } from '../api/entities/APIKey';

createConnection().then(async connection => {
  const apiKeyRepository = connection.getRepository(APIKey);
  const apiKey = crypto.randomBytes(20).toString('hex');
  const newApiKey = new APIKey(apiKey);
  await apiKeyRepository.save(newApiKey);
  console.log(`Your API Key: ${apiKey}`);
  await connection.close();
}).catch(error => console.log("TypeORM connection error: ", error));
