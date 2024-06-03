import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createConnection } from 'typeorm';
import captchaRoutes from './routes/captcha_routes';

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', captchaRoutes);

app.use(express.static(path.join(__dirname, '../public')));

createConnection().then(connection => {
  app.locals.connection = connection;

  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log("TypeORM connection error: ", error));

export default app;
