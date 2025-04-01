import { Tweet } from '@prisma/client';
import { prismaClient  } from "../database/prisma.client";
import { cadastrarTweetDTO } from '../dto/tweet.dto'




export class TweetService {

  public async listarTweets(): Promise<Tweet[]> {
    const listarTweets = await prismaClient.tweet.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            username: true,
          },
        },
        replies: true,
        likes: true,
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    return listarTweets;
  }
  
  public async cadastrar({conteudo, tipo, usuarioId}: cadastrarTweetDTO): Promise<Tweet>{
      
    const novoTweet = await prismaClient.tweet.create({
        data: {
            conteudo,
            tipo,
            usuarioId,
        },
    })

    return novoTweet;

  }

}
