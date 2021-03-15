export function startOfTheDay(date: Date) {
    const start = new Date(date.getTime());
    start.setHours(0, 0, 0, 0);

    return start;
}

export function endOfTheDay(date: Date) {
    const end = new Date(date.getTime());
    end.setHours(23, 59, 59, 999);

    return end;
}
