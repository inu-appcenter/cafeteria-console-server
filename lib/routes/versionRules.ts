import appVersionRuleRepository from '../repositories/AppVersionRuleRepository';
import Entity from '../utils/Entity';
import AppVersionRule from '../entities/AppVersionRule';

export async function allVersionRules() {
  const all = await appVersionRuleRepository.getAllVersionRules();

  return all.map((rule) => rule.serialize());
}

// @ts-ignore
export async function createVersionRule({rule}) {
  const parsed = Entity.parse(rule, AppVersionRule);

  return await appVersionRuleRepository.createVersionRule(parsed);
}

// @ts-ignore
export async function updateVersionRule({rule}) {
  const parsed = Entity.parseFiltered(rule, AppVersionRule);

  return await appVersionRuleRepository.updateVersionRule(parsed);
}

export async function deleteVersionRule(ruleId: number) {
  return await appVersionRuleRepository.deleteVersionRule(ruleId);
}
