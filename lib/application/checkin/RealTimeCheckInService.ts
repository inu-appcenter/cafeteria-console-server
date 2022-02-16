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
import ConnectionPool from '../../infrastructure/webserver/libs/ConnectionPool';
import GetCheckInContext from './GetCheckInContext';
import {printError} from 'graphql';

class RealTimeCheckInService {
  private pool = new ConnectionPool();

  constructor() {
    setInterval(async () => {
      await this.propagateContextForActiveSubjects();
    }, 1000);
  }

  listenContextFor(cafeteriaId: number, res: express.Response) {
    this.pool.add(`cafeteria_${cafeteriaId}`, res);
  }

  async propagateContext(cafeteriaId: number) {
    try {
      const context = await GetCheckInContext.run({cafeteriaId});

      await this.pool.broadcast(`cafeteria_${cafeteriaId}`, 'context', context);
    } catch (e) {
      printError(e);
    }
  }

  async propagateContextForActiveSubjects() {
    const activeSubjects = this.pool.getActiveSubjects();

    await Promise.all(
      activeSubjects.map((subject) => {
        const cafeteriaId = Number.parseInt(subject.replace('cafeteria_', ''));

        return this.propagateContext(cafeteriaId);
      })
    );
  }
}

export default new RealTimeCheckInService();
