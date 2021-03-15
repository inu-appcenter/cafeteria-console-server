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

export function parseDateString(dateString: string) {
    if(!/^(\d){8}$/.test(dateString)) {
        return undefined;
    }

    const y = parseInt(dateString.substr(0,4));
    const m = parseInt(dateString.substr(4,2)) - 1;
    const d = parseInt(dateString.substr(6,2));

    return new Date(y, m, d);
}

export function localDateString(date: Date) {
    const format = {
        M: (date.getMonth() + 1).toString().padStart(2, "0"),
        d: date.getDate().toString().padStart(2, "0"),
        D: date.getDate().toString().padStart(2, "0"),
        h: date.getHours().toString().padStart(2, "0"),
        m: date.getMinutes().toString().padStart(2, "0"),
        s: date.getSeconds().toString().padStart(2, "0"),
        y: date.getFullYear().toString().padStart(4, "0"),
        Y: date.getFullYear().toString().padStart(4, "0")
    };

    return `${format.Y}-${format.M}-${format.D} ${format.h}:${format.m}:${format.s}`
}
