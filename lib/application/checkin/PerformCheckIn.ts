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
