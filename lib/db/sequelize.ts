import {Sequelize} from "sequelize-typescript";
import config from "../../config";
import CafeteriaModel from "./models/CafeteriaModel";
import CornerModel from "./models/CornerModel";

const sequelize = new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    // @ts-ignore
    config.sequelize
);

sequelize.addModels([
    // @ts-ignore
    CafeteriaModel,

    // @ts-ignore
    CornerModel
]);

export default sequelize;
