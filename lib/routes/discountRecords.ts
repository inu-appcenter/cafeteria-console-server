import express from "express";
import discountTransactionRepository from "../repositories/DiscountTransactionRepository";
import {localDateString, parseDateString} from "../utils/date";
import {exportToExcel} from "../utils/fileExports";
import DiscountTransaction from "../entities/DiscountTransaction";

function toMatrix(records: DiscountTransaction[]) {
    const columns = ['결제 확정 시각', '학번', '식당 번호(4: 학생식당)', '식사 시간대(4: 아침, 2: 점심, 1: 저녁)'];
    const rows = records.map((record) => [
        localDateString(record.timestamp),
        record.userId.toString(),
        record.cafeteriaId.toString(),
        record.mealType.toString()
    ]);

    return [columns, ...rows];
}

export default async (req: express.Request, res: express.Response) => {
    const date = req.params.date as string;
    const cafeteriaId = req.query.cafeteriaId as string;

    const discountRecords = await discountTransactionRepository.getTransactions({
        cafeteriaId: cafeteriaId ? parseInt(cafeteriaId) : undefined,
        date: parseDateString(date)
    });

    const workbook = await exportToExcel(toMatrix(discountRecords), date);

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${date}.xlsx`);

    await workbook.xlsx.write(res);

    res.end();
}
