import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import Cafeteria from "../entities/Cafeteria";
import Corner from "../entities/Corner";

import hello from "./hello";
import {allCafeteria, createCafeteria, deleteCafeteria, updateCafeteria} from "./cafeteria";
import {allCorners, createCorner, deleteCorner, updateCorner} from "./corners";
import {allRules, updateRule} from "./rules";
import {
    allValidationParams,
    createValidationParams,
    deleteValidationParams,
    updateValidationParams
} from "./validationParams";
import CafeteriaDiscountRule from "../entities/CafeteriaDiscountRule";
import CafeteriaValidationParams from "../entities/CafeteriaValidationParams";

const query = `
    type Query {
        hello: String
        allCafeteria: [Cafeteria]
        allCorners: [Corner]
        allRules: [CafeteriaDiscountRule]
        allValidationParams: [CafeteriaValidationParams]
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
        
        updateRule(rule: CafeteriaDiscountRuleInput): Int
        
        createValidationParams(params: CafeteriaValidationParamsInput): Int
        updateValidationParams(params: CafeteriaValidationParamsInput): Int
        deleteValidationParams(cafeteriaId: Int): Int
    }
`;

const graphqlRoute = graphqlHTTP({

    schema: buildSchema([
        Cafeteria.type(),
        Cafeteria.input(),
        Corner.type(),
        Corner.input(),
        CafeteriaDiscountRule.type(),
        CafeteriaDiscountRule.input(),
        CafeteriaValidationParams.type(),
        CafeteriaValidationParams.input(),
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

        allRules,
        updateRule,

        allValidationParams,
        createValidationParams,
        updateValidationParams,
        deleteValidationParams
    },

    graphiql: true
});

export default graphqlRoute;
