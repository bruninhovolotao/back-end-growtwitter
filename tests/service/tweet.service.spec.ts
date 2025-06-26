import { cadastrarTweetDTO, CriarRetweetDTO } from "../../src/dto/tweet.dto";
import { TweetService } from "../../src/services/tweet.service"
import { prismaMock } from "../config/prisma.mock";
import { TweetType, Tweet } from "@prisma/client";

describe('Testes para as funções de cadastro de tweets', () => {
    const sut = new TweetService();

    it('Deve retornar o tweet cadastrado quando enviado corretamente', async () => {
        const input: cadastrarTweetDTO = {
            conteudo: "teste",
            tipo: TweetType.tweet,
            usuarioId: 1
        }

        const tweetMock = {
            id: 10,
            conteudo: "teste",
            tipo: TweetType.tweet,
            usuarioId: 1,
            criadoEm: new Date(),
            replyToId: null
        }

        prismaMock.tweet.create.mockResolvedValue(tweetMock)

        const result = await sut.cadastrar(input)

        expect(result).toBeDefined();
        expect(result).toHaveProperty("id", 10)
        expect(result).toHaveProperty("conteudo", "teste")
        expect(result).toHaveProperty("usuarioId", 1)
        expect(result.tipo).toBe("tweet")

    })

    it('Deve retornar a lista de tweets', async () => {
        const mockTweets = [
            {
              id: 1,
              conteudo: "Tweet 1",
              tipo: TweetType.tweet,
              criadoEm: new Date(),
              usuarioId: 1,
              replyToId: null,
              usuario: {
                id: 1,
                nome: "João",
                username: "joao",
              },
              likes: [
                {
                  id: 10,
                  usuarioId: 2,
                  tweetId: 1,
                  criadoEm: new Date(),
                  atualizadoEm: new Date(),
                },
              ],
              replies: [
                {
                  id: 5,
                  conteudo: "Reply",
                  criadoEm: new Date(),
                  tipo: TweetType.reply,
                  usuarioId: 2,
                  usuario: {
                    id: 2,
                    nome: "Pedro",
                    username: "pedro",
                  },
                },
              ],
              _count: {
                replies: 1,
              },
            },
            {
              id: 2,
              conteudo: "Tweet 2",
              tipo: TweetType.tweet,
              criadoEm: new Date(),
              usuarioId: 2,
              replyToId: null,
              usuario: {
                id: 2,
                nome: "Pedro",
                username: "pedro",
              },
              likes: [
                {
                  id: 11,
                  usuarioId: 1,
                  tweetId: 2,
                  criadoEm: new Date(),
                  atualizadoEm: new Date(),
                },
              ],
              replies: [],
              _count: {
                replies: 0,
              },
            },
          ];

        prismaMock.tweet.findMany.mockResolvedValue(mockTweets)

        const result = await sut.listarTweets() as Array<Tweet & {
            usuario: { id: number; nome: string; username: string };
            likes: any[];
            replies: any[];
            _count: { replies: number };
          }>;

        expect(result).toHaveLength(2)
        result.forEach((tweet) => {
            expect(tweet).toHaveProperty("id");
            expect(tweet).toHaveProperty("conteudo");
            expect(tweet).toHaveProperty("usuario.nome");
            expect(Array.isArray(tweet.replies)).toBe(true);
            expect(Array.isArray(tweet.likes)).toBe(true);
        })

    })

    it('Deve criar o retweet se enviado corretamente', async () => {
        const input = {
            id: 1,
            conteudo: "teste",
            tweetId: 1,
            usuarioId: 1,
        }

        prismaMock.tweet.findUnique.mockResolvedValue({ id: 1 } as any)

        const mockRetweet = {
            conteudo: "teste",
            tipo: TweetType.reply,
            usuarioId: 1,
            id: 1,
            criadoEm: new Date(),
            replyToId: 1
        }

        prismaMock.tweet.create.mockResolvedValue(mockRetweet);

        const result = await sut.criarRetweet(input);

        expect(result).toHaveProperty("id", 1);
        expect(result).toHaveProperty("conteudo", "teste");
        expect(result).toHaveProperty("usuarioId", 1);
        expect(result.tipo).toBe(TweetType.reply);
    })

    it("Deve lançar erro se o tweet original não for encontrado", async () => {
        const input = {
          conteudo: "teste",
          tweetId: 1,
          usuarioId: 1,
        };
      
        prismaMock.tweet.findUnique.mockResolvedValue(null);
      
        await expect(sut.criarRetweet(input)).rejects.toThrow("Nenhum tweet encontrado para o usuário com esse ID 1.");
      });      

})