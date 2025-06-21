import { Router } from "express";
import { TweetController } from '../controllers/tweet.controller';
import { authMiddleware } from "../middlewares/auth.middleware";

export class TweetRoutes {
    public static bind(): Router{
        const router = Router();
        const controller = new TweetController();

        router.use(authMiddleware);
        
        router.get("/tweets", controller.listar);
        router.get("/tweets/:id", controller.listarPorId);
        router.post("/tweets", controller.cadastrar);
        router.post("/tweets/:id/reply", controller.criarRetweet);
        router.put("/tweets/:id", controller.atualizar);
        router.delete("/tweets/:id", controller.deletar);

        return router;

    }
}