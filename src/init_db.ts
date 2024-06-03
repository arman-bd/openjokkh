import { createConnection } from 'typeorm';
import { APIKey } from './api/entities/APIKey';
import { Challenge } from './api/entities/Challenge';

createConnection().then(async connection => {
  await connection.synchronize();
  console.log('Database initialized');
  await connection.close();
}).catch(error => console.log("TypeORM connection error: ", error));
