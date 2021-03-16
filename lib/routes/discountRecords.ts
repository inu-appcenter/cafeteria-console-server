import express from "express";
import discountTransactionRepository from "../repositories/DiscountTransactionRepository";
import {localDateString, parseDateString} from "../utils/date";
import {createExcelWorkbookFromMatrix} from "../utils/fileExports";
import DiscountTransaction from "../entities/DiscountTransaction";
import {Workbook} from "exceljs";

export default async (req: express.Request, res: express.Response) => {
    const date = req.params.date as string;
    const fileType = req.query.fileType as string;
    const cafeteriaId = req.query.cafeteriaId as string;

    const discountRecords = await getRequestedRecords(date, cafeteriaId);

    switch (fileType || 'txt') {
        case 'txt':
            const text = formatSimpleText(discountRecords);
            sendText(res, text);
            break;

        case 'xls':
            const workbook = await createExcelWorkbookFromMatrix(toMatrix(discountRecords), date);
            sendExcelWorkbook(res, workbook, `${date}.xlsx`);
            break;

        default:
            sendWrongRequest(res, "fileType은 txt와 xls 중 하나입니다.");
            break;
    }
}

async function getRequestedRecords(dateParam?: string, cafeteriaIdQuery?: string) {
    return await discountTransactionRepository.getTransactions({
        cafeteriaId: cafeteriaIdQuery ? parseInt(cafeteriaIdQuery) : undefined,
        date: dateParam ? parseDateString(dateParam) : undefined
    });
}

function formatSimpleText(records: DiscountTransaction[]) {
    return "히히";
}

function sendText(res: express.Response, text: string) {
    res.send(text);
}

function toMatrix(records: DiscountTransaction[]) {
    const columns = [
        '결제 확정 시각',
        '학번',
        '식당 번호(4: 학생식당)',
        '식사 시간대(4: 아침, 2: 점심, 1: 저녁)'
    ];
    const rows = records.map((record) => [
        localDateString(record.timestamp),
        record.userId.toString(),
        record.cafeteriaId.toString(),
        record.mealType.toString()
    ]);

    return [columns, ...rows];
}

function sendExcelWorkbook(res: express.Response, workbook: Workbook, filename: string) {
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    workbook.xlsx.write(res).then(() => res.end());
}

function sendWrongRequest(res: express.Response, message: string) {
    res.status(400).send(`요청 형태가 올바르지 않습니다! ${message}`);
}
