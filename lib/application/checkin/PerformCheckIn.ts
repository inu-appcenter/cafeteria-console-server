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

import UseCase from '../../core/base/UseCase';
import CheckInHandler from './handler/CheckInHandler';
import CheckInRequestParser from './parser/CheckInRequestParser';

export type CheckInParams = {
  ticket: string;
  gracefulInTime: boolean;
};

class PerformCheckIn extends UseCase<CheckInParams, void> {
  async onExecute({ticket, gracefulInTime}: CheckInParams): Promise<void> {
    const booking = await new CheckInRequestParser(ticket).bringBooking();

    await new CheckInHandler(booking).performCheckIn(gracefulInTime);
  }
}

export default new PerformCheckIn();
