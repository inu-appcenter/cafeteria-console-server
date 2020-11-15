import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import Cafeteria from "../entities/Cafeteria";
import Corner from "../entities/Corner";

import hello from "./hello";
import {allCafeteria, createCafeteria, deleteCafeteria, updateCafeteria} from "./cafeteria";
import {allCorners, createCorner, deleteCorner, updateCorner} from "./corners";

const query = `
    type Query {
        hello: String
        allCafeteria: [Cafeteria]
        allCorners: [Corner]
    }
`;

// Mutation methods return number of affected rows.
const mutation = `
    type Mutation {
        createCafeteria(cafeteria: CafeteriaInput): Int
        updateCafeteria(cafeteria: CafeteriaInput): Int
        deleteCafeteria(cafeteriaId: Int): Int
        
        createCorner(corner: CornerInput): Int
        updateCorner(corner: CornerInput): Int
        deleteCorner(cornerId: Int): Int
    }
`;

const graphqlRoute = graphqlHTTP({

    schema: buildSchema([
        Cafeteria.type(),
        Cafeteria.input(),
        Corner.type(),
        Corner.input(),
        query,
        mutation
    ].join('\n')),

    rootValue: {
        hello,

        allCafeteria,
        createCafeteria,
        updateCafeteria,
        deleteCafeteria,

        allCorners,
        createCorner,
        updateCorner,
        deleteCorner,
    },

    graphiql: true
});

export default graphqlRoute;
