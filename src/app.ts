import { Server } from '@models';
import dotenv from 'dotenv';
dotenv.config();

const server = new Server();

server.listen();
