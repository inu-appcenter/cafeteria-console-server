import express from 'express';

export default (req: express.Request, res: express.Response) => {
  res.send('오이! 여긴 어떻게 알았냐구!');
};
