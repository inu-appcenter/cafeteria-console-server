import excel from "exceljs";

/**
 * 주어진 2차원 배열을 엑셀로 표현합니다.
 *
 * @param matrix 정보가 담긴 2차원 배열. 첫 줄에는 컬럼 정보가 들어갑니다.
 * @param title 시트 이름.
 */
export async function exportToExcel(matrix: string[][], title?: string) {
    const columnNames = matrix.shift();
    if (columnNames === undefined) {
        throw new Error("matrix의 첫 번째 줄에는 컬럼 정의가 있어야 합니다~!");
    }
    const rowValues = matrix;

    const workbook = new excel.Workbook();
    const sheet = workbook.addWorksheet(title);

    sheet.columns = columnNames.map((name) => ({
        header: name, key: name, width: 42, style: {
            font: {
                size: 18
            }
        }
    }));

    for (const row of rowValues) {
        const columnObject = {};
        columnNames.forEach((name, index) => {
            // @ts-ignore
            columnObject[name] = row[index]
        });

        sheet.addRow(columnObject);
    }

    return workbook;
}
