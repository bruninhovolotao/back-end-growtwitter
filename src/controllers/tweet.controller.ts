import { Request, Response } from "express";
import { HTTPError } from "../utils/http.error"; 
import { onError } from "../utils/on-error";
import { TweetService } from "../services/tweet.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

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

    public async listarPorId(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { usuarioId } = req.params;
            const userId = Number(usuarioId);
            const service = new TweetService();

            // processamento
            const tweets = await service.listarPorId( userId );

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

    public async cadastrar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            // input
            const { conteudo, tipo } = req.body;
            const usuarioId = req.userId

            if (!usuarioId) {
            throw new HTTPError(401, "Usuário não autenticado.");
            }

            const service = new TweetService();
            
            // processamento
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

    public async criarRetweet(req: Request, res: Response): Promise<void>{
        try {
            const { id: tweetIdParams } = req.params
            const { conteudo } = req.body
            const usuarioId = req.userId
            const tweetId = Number(tweetIdParams);

            if (!conteudo || isNaN(tweetId)) {
                res.status(400).json({
                success: false,
                message: "Conteúdo ou ID do tweet inválido.",
                });
                return;
            }

            const service = new TweetService();

            const reply = await service.criarRetweet({
                conteudo, 
                usuarioId, 
                tweetId
            });

            res.status(201).json({
                sucess: true,
                message: "Resposta criada com sucesso",
                data: reply
            })
        } catch (error) {
            onError(error, res)
        }
    }
            
    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { id, conteudo, tipo } = req.body;
            const service = new TweetService();
            
            // processamento
            const updateTweet = await service.atualizar({ id, conteudo, tipo });

            // resposta
            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet atualizado com sucesso",
                dados: updateTweet,
            })
            
            } catch (error) {
                onError(error, res);
                
            }
        }

    public async deletar(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { id } = req.params;
            const tweetId = Number(id);
            const service = new TweetService();

            // processamento
            const deletarTweet = await service.deletar( tweetId );

            // resposta
            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet excluído com sucesso",
                dados: deletarTweet
            })

        } catch (error) {
            onError(error, res);
        }
    }
}