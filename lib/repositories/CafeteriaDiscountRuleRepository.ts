import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import CafeteriaDiscountRule from "../entities/CafeteriaDiscountRule";
import CafeteriaDiscountRuleModel from "../db/models/CafeteriaDiscountRuleModel";

class CafeteriaDiscountRuleRepository extends SequelizeCRUDRepository<CafeteriaDiscountRule, CafeteriaDiscountRuleModel> {

    constructor() {
        super(CafeteriaDiscountRule, CafeteriaDiscountRuleModel);
    }

    async getRule(id: number) {
        return this.read(id);
    }

    async getAllRules() {
        return this.readAll();
    }

    async updateRule(rule: CafeteriaDiscountRule) {
        return this.update(rule, ['name', 'description']);
    }
}

const cafeteriaDiscountRuleRepository = new CafeteriaDiscountRuleRepository();

export default cafeteriaDiscountRuleRepository;
