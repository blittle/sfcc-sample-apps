import * as Express from 'express';
export type Resolver = { [key: string]: any };
export type ResolverFactory = (config: any) => Resolver;

export const CORE_GRAPHQL_KEY = Symbol('Core GraphQL with Apollo');
export const EXPRESS_KEY = Symbol('Node Express');

export interface GraphQLExtension {
    getResolvers: ResolverFactory;
    typeDefs: Array<string>;
}

export interface Request extends Express.Request {
    session: { [key: string]: string };
}
