/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import express from 'express';
import GetCheckInContext from './GetCheckInContext';
import {logger, ConnectionPool} from '@inu-cafeteria/backend-core';

class RealTimeContextService {
  private pool = new ConnectionPool();

  constructor() {
    setInterval(async () => {
      await this.emitContextsOfActiveSubjects();
    }, 1000);
  }

  /**
   * Context의 변화를 구독할 listener를 등록합니다.
   *
   * @param cafeteriaId 변화를 구독할 식당의 식별자.
   * @param res 리스너. Express의 response 인스턴스.
   */
  addContextListener(cafeteriaId: number, res: express.Response) {
    this.pool.add(`cafeteria_${cafeteriaId}`, res);
  }

  /**
   * 지정된 식당의 현재 Context를 모든 listener에게 방출합니다.
   * @param cafeteriaId Context를 방출할 학식당의 식별자.
   */
  async emitContext(cafeteriaId: number) {
    try {
      const context = await GetCheckInContext.run({cafeteriaId});

      await this.pool.broadcast(`cafeteria_${cafeteriaId}`, 'context', context);
    } catch (e) {
      logger.error(`식당 ${cafeteriaId}의 Context 방출 실패: ${e}`);
    }
  }

  /**
   * 현재 최소 한 명 이상이라도 listener가 있는 식당(active subject)에 대해
   * 해당 식당의 현재 Context를 모든 listener에게 방출합니다.
   */
  async emitContextsOfActiveSubjects() {
    const activeSubjects = this.pool.getActiveSubjects();

    await Promise.all(
      activeSubjects.map((subject) => {
        const cafeteriaId = Number.parseInt(subject.replace('cafeteria_', ''));

        return this.emitContext(cafeteriaId);
      })
    );
  }
}

export default new RealTimeContextService();
