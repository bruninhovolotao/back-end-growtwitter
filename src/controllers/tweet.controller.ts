import { Request, Response } from "express";
import { HTTPError } from "../utils/http.error"; 
import { onError } from "../utils/on-error";
import { prismaClient } from "../database/prisma.client";
import { TweetService } from "../services/tweet.service";

const prisma = prismaClient;

export class TweetController{
    public async listar(req: Request, res: Response): Promise<void> {
        
        try {
            // input
         const service = new TweetService();

         // processamento
      const tweets = await service.listarTweets();

      // resposta
      res.status(200).json({
        success: true,
        message: "Lista de tweets carregada com sucesso",
        dados: tweets,
      });
    } catch (error) {
      onError(error, res);
    }
    }

    public async listarPorId(req: Request, res: Response): Promise<void> {}

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {

            // input
            const { conteudo, tipo, usuarioId } = req.body;

            // processamento
            const service = new TweetService();

            const resultado = await service.cadastrar({ conteudo, tipo, usuarioId });

            // resposta
            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet cadastrado com sucesso",
                dados: resultado,
            })

        } catch (error) {
            onError(error, res);
        }

}
            
    public async atualizar(req: Request, res: Response): Promise<void> {}

    public async deletar(req: Request, res: Response): Promise<void> {}
}