import express from "express";
import discountTransactionRepository from "../repositories/DiscountTransactionRepository";
import {localDateString, parseDateString} from "../utils/date";
import {createExcelWorkbookFromMatrix} from "../utils/fileExports";
import DiscountTransaction from "../entities/DiscountTransaction";
import {Workbook} from "exceljs";

export default async (req: express.Request, res: express.Response) => {
    const date = req.params.date as string;
    const cafeteriaId = req.query.cafeteriaId as string;

    const discountRecords = await getRequestedRecords(date, cafeteriaId);
    const workbook = await createExcelWorkbookFromMatrix(toMatrix(discountRecords), date);

    await sendExcelWorkbook(res, workbook, `${date}.xlsx`);
}

async function getRequestedRecords(dateParam?: string, cafeteriaIdQuery?: string) {
    return await discountTransactionRepository.getTransactions({
        cafeteriaId: cafeteriaIdQuery ? parseInt(cafeteriaIdQuery) : undefined,
        date: dateParam ? parseDateString(dateParam) : undefined
    });
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

async function sendExcelWorkbook(res: express.Response, workbook: Workbook, filename: string) {
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    await workbook.xlsx.write(res);

    res.end();
}
