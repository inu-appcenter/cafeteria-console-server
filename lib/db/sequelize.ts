import {Sequelize} from "sequelize-typescript";
import config from "../../config";
import Cafeteria from "./models/Cafeteria";
import Corner from "./models/Corner";

const sequelize = new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    // @ts-ignore
    config.sequelize
);

sequelize.addModels([
    // @ts-ignore
    Cafeteria,

    // @ts-ignore
    Corner
]);

export default sequelize;
