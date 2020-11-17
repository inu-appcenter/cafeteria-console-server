import cafeteriaDiscountRuleRepository from "../repositories/CafeteriaDiscountRuleRepository";
import Entity from "../utils/Entity";
import Corner from "../entities/Corner";
import CafeteriaDiscountRule from "../entities/CafeteriaDiscountRule";

export async function allRules() {
    const all = await cafeteriaDiscountRuleRepository.getAllRules();

    return all.map((rule) => rule.serialize());
}

// @ts-ignore
export async function updateRule({rule}) {
    return await cafeteriaDiscountRuleRepository.updateRule(Entity.parseFiltered(rule, CafeteriaDiscountRule));
}
