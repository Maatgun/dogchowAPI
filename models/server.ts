import express, {Express} from 'express';

import cors from 'cors';

import { dbConnection } from '../database/config';

import authRoutes from '../routes/auth';

import ordersRoutes from '../routes/orders';


export class Server {
 app: Express;
 port: string | number | undefined;
 authPath: string;
 ordersPath: string;

    constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.authPath = '/auth';
    this.ordersPath = '/orders';

    // Connect to database
    this.connectDB();

    this.middlewares();

    // Routes

    this.routes();


    }

    async connectDB(): Promise<void> {
        await dbConnection();
    }

    middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}