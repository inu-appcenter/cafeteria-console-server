import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import Cafeteria from "../entities/Cafeteria";
import Corner from "../entities/Corner";

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
import logger from "../utils/logger";
import ParseRegex from "../entities/ParseRegex";
import {allParseRegexes, createParseRegex, deleteParseRegex, updateParseRegex} from "./parseRegex";
import TransactionHistory from "../entities/TransactionHistory";
import {allTransactionHistories} from "./transactionHistory";
import InvalidParamError from "../errors/InvalidParamError";

const query = `
    type Query {
        allCafeteria: [Cafeteria]
        allCorners: [Corner]
        allRules: [CafeteriaDiscountRule]
        allValidationParams: [CafeteriaValidationParams]
        allParseRegexes: [ParseRegex]
        allTransactionHistories: [TransactionHistory]
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
        
        createParseRegex(regex: ParseRegexInput): Int
        updateParseRegex(regex: ParseRegexInput): Int
        deleteParseRegex(regexId: Int): Int
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

        ParseRegex.type(),
        ParseRegex.input(),

        TransactionHistory.type(),

        query,
        mutation
    ].join('\n')),

    rootValue: {
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
        deleteValidationParams,

        allParseRegexes,
        createParseRegex,
        updateParseRegex,
        deleteParseRegex,

        allTransactionHistories
    },

    graphiql: true,

    customFormatErrorFn: (error) => {
        if (error.message === InvalidParamError.message) {
            logger.warn('오이!! 그런 잘못된 요청은 나를 화나게 한다구...?');
        } else {
            logger.error(error);
        }

        return error;
    }
});

export default graphqlRoute;
