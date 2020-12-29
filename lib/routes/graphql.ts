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
import Notice from "../entities/Notice";
import {allNotices, createNotice, deleteNotice, updateNotice} from "./notices";
import Question from "../entities/Question";
import Answer from "../entities/Answer";
import {allQuestions, answerQuestion, deleteAnswer, updateAnswer} from "./interaction";
import AppVersionRule from "../entities/AppVersionRule";
import {allVersionRules, createVersionRule, deleteVersionRule, updateVersionRule} from "./versionRules";
import {
    allCafeteriaKioskNumbers,
    createCafeteriaKioskNumbers,
    deleteCafeteriaKioskNumbers,
    updateCafeteriaKioskNumbers
} from "./kioskNumbers";
import CafeteriaKioskNumbers from "../entities/CafeteriaKioskNumbers";

const query = `
    type Query {
        allCafeteria: [Cafeteria]
        allCorners: [Corner]
        allRules: [CafeteriaDiscountRule]
        allValidationParams: [CafeteriaValidationParams]
        allParseRegexes: [ParseRegex]
        allTransactionHistories: [TransactionHistory]
        allNotices: [Notice]
        allQuestions: [Question]
        allVersionRules: [AppVersionRule]
        allCafeteriaKioskNumbers: [CafeteriaKioskNumbers]
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
        
        createNotice(notice: NoticeInput): Int
        updateNotice(notice: NoticeInput): Int
        deleteNotice(noticeId: Int): Int
        
        answerQuestion(questionId: Int, answer: AnswerInput): Int
        updateAnswer(questionId: Int, answer: AnswerInput): Int
        deleteAnswer(questionId: Int): Int
        
        createVersionRule(rule: AppVersionRuleInput): Int
        updateVersionRule(rule: AppVersionRuleInput): Int
        deleteVersionRule(ruleId: Int): Int
        
        createCafeteriaKioskNumbers(kioskNumbers: CafeteriaKioskNumbersInput): Int
        updateCafeteriaKioskNumbers(kioskNumbers: CafeteriaKioskNumbersInput): Int
        deleteCafeteriaKioskNumbers(cafeteriaId: Int): Int
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

        Notice.type(),
        Notice.input(),

        Question.type(),

        Answer.type(),
        Answer.input(),

        AppVersionRule.type(),
        AppVersionRule.input(),

        CafeteriaKioskNumbers.type(),
        CafeteriaKioskNumbers.input(),

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

        allTransactionHistories,

        allNotices,
        createNotice,
        updateNotice,
        deleteNotice,

        allQuestions,
        answerQuestion,
        updateAnswer,
        deleteAnswer,

        allVersionRules,
        createVersionRule,
        updateVersionRule,
        deleteVersionRule,

        allCafeteriaKioskNumbers,
        createCafeteriaKioskNumbers,
        updateCafeteriaKioskNumbers,
        deleteCafeteriaKioskNumbers
    },

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
