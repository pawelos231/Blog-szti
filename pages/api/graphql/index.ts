import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema, Resolver, Query, Arg, ObjectType,Field, ID } from "type-graphql";
import "reflect-metadata"


@ObjectType()
export class Dog{
    @Field(()=> ID)
    name: string
}

@Resolver(Dog)
export class DogResolver{
    @Query(()=>[Dog])
    dogs(): Dog[] {
        return [
            {name: "Bo"},
            {name: "Lassies"}
        ]
    }
}

const schema = await buildSchema({
    resolvers: [DogResolver]
})

const server = new ApolloServer({
    schema
});
export const config = {
    api: {
        bodyParser: false
    }
}

export const startServer = server.start()
export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    await startServer;  
    await server.createHandler({path: "/api/graphql"})(req, res) 
}