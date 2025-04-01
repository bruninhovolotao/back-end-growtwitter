import express from 'express';
import {envs} from './envs';
import { tweetRoutes } from './routes/tweet.routes';

const app = express();

app.use(express.json());

app.get("/", (_, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "Welcome to the API",
    })
});

app.use(tweetRoutes.bind())

app.listen(envs.PORT, () => console.log('Servidor conectado com sucesso.'))