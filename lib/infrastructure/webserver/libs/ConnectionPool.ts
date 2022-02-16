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

export default class ConnectionPool {
  private connections: Map<string, express.Response[]> = new Map();

  add(subject: string, res: express.Response) {
    const subjectPool = this.connections.get(subject) ?? [];
    this.connections.set(subject, subjectPool);

    if (subjectPool.includes(res)) {
      console.log('OK!');
      return;
    }

    if (res.headersSent) {
      console.log('DAMN!');
      return;
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    console.log(`${subject} 풀에서 새 클라이언트와의 SSE 연결!! >_<`);

    res.on('close', () => {
      console.log(`${subject} 풀에서 클라이언트와의 SSE 연결 종료 ㅠㅡㅠ`);
      this.removeFromPool(subjectPool, res);
    });

    subjectPool.push(res);
  }

  async broadcast(subject: string, type: string, data: Record<string, any>) {
    const subjectPool = this.connections.get(subject) ?? [];

    for (const connection of subjectPool) {
      try {
        await new Promise<void>((res, rej) => {
          connection.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`, (error) => {
            if (error) {
              rej(error);
            } else {
              res();
            }
          });
        });
      } catch (e) {
        console.log('OH SHIT');
        this.removeFromPool(subjectPool, connection);
      }
    }
  }

  private removeFromPool(pool: express.Response[], res: express.Response) {
    pool.splice(pool.indexOf(res), 1);
  }

  getActiveSubjects(): string[] {
    return Array.from(this.connections.entries())
      .filter(([k, v]) => v.length > 0)
      .map(([k, v]) => k);
  }
}
