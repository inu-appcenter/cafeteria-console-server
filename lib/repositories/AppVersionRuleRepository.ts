import SequelizeCRUDRepository from './base/SequelizeCRUDRepository';
import AppVersionRule from '../entities/AppVersionRule';
import AppVersionRuleModel from '../db/models/AppVersionRuleModel';

class AppVersionRuleRepository extends SequelizeCRUDRepository<
  AppVersionRule,
  AppVersionRuleModel
> {
  constructor() {
    super(AppVersionRule, AppVersionRuleModel);
  }

  async createVersionRule(rule: AppVersionRule) {
    return this.create(rule);
  }

  async getAllVersionRules() {
    return this.readAll();
  }

  async updateVersionRule(versionRule: AppVersionRule) {
    return this.update(versionRule, ['id']);
  }

  async deleteVersionRule(ruleId: number) {
    return this.delete(ruleId);
  }
}

const appVersionRuleRepository = new AppVersionRuleRepository();

export default appVersionRuleRepository;
