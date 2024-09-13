import dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import { mintAndTransfer } from './Web3Provider';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT: number = parseInt(`${process.env.PORT || 3001}`);

app.use(morgan("tiny"));
app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN_URL || '*'
}));

const nextMint = new Map();

app.post("/mint/:wallet", async (req: Request, res: Response, next: NextFunction) => {
    const wallet = req.params.wallet;

    if (nextMint.has(wallet) && nextMint.get(wallet) > Date.now())
        return res.status(404).json("You can't get coint twice in a day. Try again tomorrow.");

    try {
        const tx = await mintAndTransfer(req.params.wallet);
        res.json(tx);
    } catch (error: any) {
        console.log(error);
        res.status(500).json(error.cause ? error.cause.message : error.message);
    }

    nextMint.set(wallet, Date.now() + (1000 * 60 * 60 * 24));
});

app.listen(PORT, () => console.log(`Server is listening at '${PORT}'`));