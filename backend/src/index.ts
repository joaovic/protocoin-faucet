import dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import { mintAndTransfer } from './Web3Provider';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT: number = parseInt(`${process.env.PORT || 3001}`);

app.use(morgan("tiny"));

console.log(process.env.CORS_ORIGIN_URL);

app.use(cors({
    origin: process.env.CORS_ORIGIN_URL || '*'
}));

app.post("/mint/:wallet", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tx = await mintAndTransfer(req.params.wallet);
        res.json(tx);
    } catch (error: any) {
        console.log(error);
        res.status(500).json(error.cause ? error.cause.message : error.message);
    }
});

app.listen(PORT, () => console.log(`Server is listening at '${PORT}'`));