import cafeteriaDiscountRuleRepository from "../repositories/CafeteriaDiscountRuleRepository";

export async function allRules() {
    const all = await cafeteriaDiscountRuleRepository.getAllRules();

    return all.map((rule) => rule.serialize());
}

// @ts-ignore
export async function updateRule({rule}) {
    return await cafeteriaDiscountRuleRepository.updateRule(rule);
}
