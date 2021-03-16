import excel, {Workbook} from "exceljs";

/**
 * 주어진 2차원 배열을 엑셀로 표현합니다.
 * exceljs의 Workbook에 WorkSheet를 하나 만들어 title로 이름지은 다음에 matrix의 정보를 채워 반환합니다.
 *
 * @param matrix 정보가 담긴 2차원 배열. 첫 줄에는 컬럼 정보가 들어갑니다.
 * @param title 시트 이름.
 * @return exceljs의 Workbook.
 */
export async function createExcelWorkbookFromMatrix(matrix: string[][], title?: string): Promise<Workbook> {

    // 1. 주어진 matrix에서 행과 열을 분리합니다.
    const columnNames = matrix.shift();
    if (columnNames === undefined) {
        throw new Error("matrix의 첫 번째 줄에는 컬럼 정의가 있어야 합니다~!");
    }
    const rowValues = matrix;

    // 2. 엑셀 워크북과 시트를 만들어 줍니다.
    const workbook = new excel.Workbook();
    const sheet = workbook.addWorksheet(title);

    // 3. 시트에 컬럼을 설정해 줍니다.
    sheet.columns = columnNames.map((name) => ({
        header: name, key: name, width: 42, style: {
            font: {
                size: 18
            }
        }
    }));

    // 4. 시트에 값들을 채워넣어 줍니다.
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
