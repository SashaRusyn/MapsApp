export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const join_address = (array: any[]) => {
    if (array[0] == null) {
        return null;
    } else if (array[1] == null) {
        return array[0];
    } else {
        return array[0] + ", " + array[1];
    }
}