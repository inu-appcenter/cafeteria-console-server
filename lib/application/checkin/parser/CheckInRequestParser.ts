import assert from 'assert';
import {Booking} from '@inu-cafeteria/backend-core';
import {NoBooking} from '../errors';
import BookingFinder from '../../booking/finder/BookingFinder';

export default class CheckInRequestParser {
  constructor(private readonly ticket: string) {}

  async bringBooking(): Promise<Booking> {
    const booking = await new BookingFinder().findByTicket(this.ticket);

    assert(booking, NoBooking());

    return booking;
  }
}
