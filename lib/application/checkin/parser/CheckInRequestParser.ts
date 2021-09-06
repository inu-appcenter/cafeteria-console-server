import assert from 'assert';
import {Booking} from '@inu-cafeteria/backend-core';
import {NoBooking} from '../errors';

export default class CheckInRequestParser {
  constructor(private readonly ticket: string) {}

  async bringBooking(): Promise<Booking> {
    const booking = await Booking.findForCheckIn(this.ticket);

    assert(booking, NoBooking());

    return booking;
  }
}
