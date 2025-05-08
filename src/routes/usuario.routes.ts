import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class UsuarioRoutes  {
    public static bind(): Router {
        const router = Router();
        const controller = new UsuarioController();
        
        router.post("/sign-up", controller.cadastrar);
        router.post("/login", controller.login);
        router.get("/user", controller.listar);
        router.get("/user/:id", controller.listarPorId);
        router.put("/:id", authMiddleware, controller.atualizar);
        router.delete("/:id", authMiddleware, controller.deletar);

        return router;
    }
}