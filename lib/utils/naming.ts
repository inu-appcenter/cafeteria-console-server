export function snakeToCamel(str: string) {
    return str.replace(
        /([-_][a-z])/g,
        (group) => group.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

export function camelToSnake(str: string) {
    return str.replace(
        /[\w]([A-Z])/g,
        (m) => m[0] + "_" + m[1])
        .toLowerCase();
}
