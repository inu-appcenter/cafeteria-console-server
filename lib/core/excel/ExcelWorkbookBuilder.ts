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

import excel from 'exceljs';

export type ExcelWorkbookBuilderParams = {
  matrix: string[][];
  title?: string;
};

/**
 * 주어진 2차원 배열을 엑셀로 표현합니다.
 * exceljs의 Workbook에 WorkSheet를 하나 만들어 title로 이름지은 다음에 matrix의 정보를 채워 반환합니다.
 *
 * @param matrix 정보가 담긴 2차원 배열. 첫 줄에는 컬럼 정보가 들어갑니다.
 * @param title 시트 이름.
 */
export default class ExcelWorkbookBuilder {
  constructor(private readonly params: ExcelWorkbookBuilderParams) {}

  build() {
    const {headers, rows} = this.extractHeaderAndRows();
    const {workbook, sheet} = this.createWorkbookWithSheet();

    sheet.columns = this.createColumns(headers);
    sheet.addRows(this.createRows(headers, rows));

    return workbook;
  }

  private extractHeaderAndRows() {
    const matrix = Array.from(this.params.matrix);

    const columnNames = matrix.shift();
    if (columnNames == null) {
      throw new Error('matrix의 첫 번째 줄에는 컬럼 정의가 있어야 합니다~!');
    }

    return {
      headers: columnNames,
      rows: matrix,
    };
  }

  private createWorkbookWithSheet() {
    const {title} = this.params;

    const workbook = new excel.Workbook();
    const sheet = workbook.addWorksheet(title);

    return {
      workbook,
      sheet,
    };
  }

  private createColumns(headers: string[]) {
    return headers.map((name) => ({
      header: name,
      key: name,
      width: 42,
      style: {
        font: {
          size: 18,
        },
      },
    }));
  }

  private createRows(headers: string[], rows: string[][]) {
    return rows.map((row) => {
      const columnObject: any = {};

      headers.forEach((name, index) => {
        columnObject[name] = row[index];
      });

      return columnObject;
    });
  }
}
