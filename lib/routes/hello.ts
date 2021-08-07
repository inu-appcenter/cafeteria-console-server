import {Request, Response} from 'express';

export default function hello(req: Request, res: Response) {
  res.send('오이! 여긴 어떻게 알았냐구!');
}
