import noticeRepository from '../repositories/NoticeRepository';
import Entity from '../utils/Entity';
import Notice from '../entities/Notice';

import AssertionEvaluator from '../utils/AssertionEvaluator';
import InvalidParamError from '../errors/InvalidParamError';

export async function allNotices() {
  const all = await noticeRepository.getAllNotices();

  return all.map((notice) => notice.serialize());
}

// @ts-ignore
export async function createNotice({notice}) {
  const parsed = Entity.parse(notice, Notice);
  if (!validateNotice(parsed)) {
    throw new InvalidParamError();
  }

  return await noticeRepository.addNotice(parsed);
}

// @ts-ignore
export async function updateNotice({notice}) {
  const parsed = Entity.parseFiltered(notice, Notice);
  if (!validateNotice(parsed)) {
    throw new InvalidParamError();
  }

  return await noticeRepository.updateNotice(parsed);
}

// @ts-ignore
export async function deleteNotice({noticeId}) {
  return await noticeRepository.deleteNotice(noticeId);
}

function validateNotice(notice: Notice) {
  try {
    // Try evaluating.
    // If throws, the expression is wrong.
    new AssertionEvaluator(true).evaluate({
      value: '4.0.0',
      assertion: notice.targetVersion,
    });

    return true;
  } catch (e) {
    return false;
  }
}
