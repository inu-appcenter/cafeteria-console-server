/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
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

import {BaseBookingFinder, Booking} from '@inu-cafeteria/backend-core';

export default class BookingFinder extends BaseBookingFinder {
  /**
   * 체크인을 위해 예약을 찾습니다.
   * relations에 user와 checkIn이 들어 있는 것이 특징입니다.
   *
   * @param ticket
   */
  async findByTicket(ticket: string): Promise<Booking | undefined> {
    return await Booking.findOne({
      where: {uuid: ticket},
      relations: this.allRelations,
    });
  }
}
