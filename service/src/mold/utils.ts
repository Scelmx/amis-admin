export const createBaseNameObj = (baseName, obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[`${baseName}${key}`] = obj[key];
        return acc;
    }, {});
}