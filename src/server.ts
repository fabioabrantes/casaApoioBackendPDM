import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const server = express();

server.use(express.json());
server.use(cors);
server.use(routes);

server.use('/upload', express.static(path.join(__dirname, '..', 'upload')));
server.use(errorHandler);

server.listen(3334, () => {
  console.log('server online on port 3334');
});
