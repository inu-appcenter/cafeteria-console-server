export function serializeObject<T extends object>(
    originalObject: T,
    fieldTransform: (fieldName: string) => string,
    exclude: [keyof T] | null = null): any {

    const serialized: any = {};

    for (const originalField in originalObject) {
        if (!originalObject.hasOwnProperty(originalField)) {
            continue;
        }

        if (exclude !== null && stringIn(originalField, exclude)) {
            continue;
        }

        const newField = fieldTransform(originalField);
        serialized[newField] = originalObject[originalField];
    }

    return serialized;
}

function stringIn(str: string, collection: any[]) {
    return collection.indexOf(str) >= 0;
}

export function parseObject<T extends object>(
    rawObject: any,
    fieldTransform: (fieldName: string) => string,
    outputObjectType: {new(): T}): T {

    const parsed = new outputObjectType();

    for (const rawField in rawObject) {
        if (!rawObject.hasOwnProperty(rawField)) {
            continue;
        }

        const objectField = fieldTransform(rawField);

        if (!parsed.hasOwnProperty(objectField)) {
            // Wrong field
            continue;
        }

        // @ts-ignore
        parsed[objectField] = rawObject[rawField];
    }

    return parsed;
}
