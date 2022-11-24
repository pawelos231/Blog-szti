import "reflect-metadata"
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Resolver, Query, Arg, ObjectType,Field, ID } from "type-graphql";
import { NextApiRequest, NextApiResponse } from "next";


@ObjectType()
class Dog{
    @Field(()=> ID)
    id!: string;
    sex: number
};

@Resolver(Dog)
export class DogsResolver{
    @Query(()=> Dog)
    dogs(): any {
        return {id: "dsa", sex:2}
        
    }
}
@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
}


let apolloServerHandler: (req: any, res: any) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
 
    const schema = await buildSchema({
      resolvers: [HelloResolver],
    });
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,

    });
    const createdServer = server.start();
    await createdServer;
    apolloServerHandler = server.createHandler({
      path: '/api/graphql',
    });
  }
  return apolloServerHandler;
};

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const apolloServerHandler = await getApolloServerHandler();  
    return apolloServerHandler(req, res);
}