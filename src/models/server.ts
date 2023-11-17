import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import limitter from 'express-rate-limit';
import { config, dbConnection } from '@config';
import { adminRoute, authRoute, patientRoute, userRoute } from '@routes';

export class Server {
  private app: Express;
  private port: string | number;
  private rootPath: string;
  private usersPath: string;
  private authPath: string;
  private adminPath: string;
  private patientPath: string;

  constructor() {
    this.app = express();
    this.port = config.app.port;
    this.rootPath = '/api/v1/';
    this.usersPath = 'users';
    this.authPath = 'auth';
    this.adminPath = 'admins';
    this.patientPath = 'patients';

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: `http://127.0.0.1:${this.port}`,
        methods: 'GET, POST, PUT, PATCH, DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200
      })
    );
    this.app.use(
      limitter({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: {
          status: 429,
          message:
            'Too many requests from this IP, please try again in an hour!'
        }
      })
    );
    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(cookieParser());
  }

  routes(): void {
    this.app.use(`${this.rootPath}${this.usersPath}`, userRoute);
    this.app.use(`${this.rootPath}${this.authPath}`, authRoute);
    this.app.use(`${this.rootPath}${this.adminPath}`, adminRoute);
    this.app.use(`${this.rootPath}${this.patientPath}`, patientRoute);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀...Server running on http://127.0.0.1:${this.port}`);
    });
  }
}
