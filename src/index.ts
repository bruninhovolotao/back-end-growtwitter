import express from 'express';
import {envs} from './envs';
import { usuarioRoutes } from './routes/usuario.routes';
import { tweetRoutes } from './routes/tweet.routes';
import { likeRoutes } from './routes/like.routes';


const app = express();

app.use(express.json());

app.get("/", (_, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "Welcome to the API",
    })
});

app.use(usuarioRoutes.bind())
app.use(tweetRoutes.bind())
app.use(likeRoutes.bind())

app.listen(envs.PORT, () => console.log('Servidor conectado com sucesso.'))