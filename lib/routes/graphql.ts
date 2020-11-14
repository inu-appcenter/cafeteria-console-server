import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import cafeteriaRepository from "../repositories/CafeteriaRepository";
import Cafeteria from "../entities/Cafeteria";
import {serializeObject} from "../utils/object";

const query = `
    type Query {
        hello: String
        allCafeteria: [Cafeteria]
    }
`;

const schema = buildSchema(Cafeteria.type() + query);

const root = {
    hello: () => {
        return 'Hello world!';
    },

    allCafeteria: async () => {
        const all = await cafeteriaRepository.getAllCafeteria();

        return all.map((c) => c.serialize());
    }
};

const graphqlRoute = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
});

export default graphqlRoute;
