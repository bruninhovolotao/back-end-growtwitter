import { Request, Response } from "express";
import { HTTPError } from "../utils/http.error";
import { onError } from "../utils/on-error";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController {

    public async login(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { emailOuUsername, senha } = req.body;

            // validação
            if (!emailOuUsername || !senha) {
                throw new HTTPError(400, "E-mail/Username e Senha são obrigatórios.");
            }

            // processamento
            const service = new UsuarioService();
            const resultado = await service.login({ emailOuUsername, senha });

            // resposta
            res.status(200).json({
                success: true,
                message: "Login realizado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {

            // input
            const service = new UsuarioService();

            // processamento
            const resultado = await service.cadastrar(req.body);

            // resposta
            res.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listar(req: Request, res: Response): Promise<void> {
        try {

            // input
            const { completo } = req.query;
            const includeRelations = completo === "true";

            // processamento
            const service = new UsuarioService();
            const usuarios = await service.listarUsuarios(includeRelations);

            // resposta
            res.status(200).json({
                success: true,
                message: "Lista de usuários carregada com sucesso",
                dados: usuarios,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarPorId(req: Request, res: Response): Promise<void> {
        try {
            
            // input
            const { id } = req.params;

            // validação
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }

            // processamento
            const userId = Number(id);
            const service = new UsuarioService();
            const usuario = await service.listarPorId(userId);

            // resposta
            res.status(200).json({
                success: true,
                message: "Usuário encontrado com sucesso",
                dados: usuario,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {

            // input
            const { id } = req.params;

            // validação
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }

            const { nome, email, senha, username } = req.body;
            const dadosAtualizacao = {
                id: Number(id),
                nome,
                email,
                senha,
                username,
            };

            // processamento
            const service = new UsuarioService();
            const resultado = await service.atualizar(dadosAtualizacao);

            // resposta
            res.status(200).json({
                success: true,
                message: "Usuário atualizado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async deletar(req: Request, res: Response): Promise<void> {
        try {

            // input
            const { id } = req.params;
            const userId = Number(id);

            // processamento
            const service = new UsuarioService();
            const resultado = await service.deletar(userId);

            // resposta
            res.status(200).json({
                success: true,
                message: "Usuário excluído com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

}