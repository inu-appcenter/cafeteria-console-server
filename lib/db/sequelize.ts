import {Sequelize} from "sequelize-typescript";
import config from "../../config";
import CafeteriaModel from "./models/CafeteriaModel";
import CornerModel from "./models/CornerModel";
import CafeteriaDiscountRuleModel from "./models/CafeteriaDiscountRuleModel";
import CafeteriaValidationParamsModel from "./models/CafeteriaValidationParamsModel";
import ParseRegexModel from "./models/ParseRegexModel";
import TransactionHistoryModel from "./models/TransactionHistoryModel";

const sequelize = new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    // @ts-ignore
    config.sequelize
);

sequelize.addModels([
    CafeteriaModel,
    CornerModel,
    CafeteriaDiscountRuleModel,
    CafeteriaValidationParamsModel,
    ParseRegexModel,
    TransactionHistoryModel
]);

export default sequelize;
