import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import { buildContext } from '../../apollo/context';

const apolloServer = new ApolloServer({
    schema,
    context: buildContext,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
