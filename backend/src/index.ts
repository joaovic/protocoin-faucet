import dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT: number = parseInt(`${process.env.PORT || 3001}`);

app.use(morgan("tiny"));

app.post("/mint/:wallet", async (req: Request, res: Response, next: NextFunction) => {
    res.json(true);
});

app.listen(PORT, () => console.log(`Server is listening at '${PORT}'`));