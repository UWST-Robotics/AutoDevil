import GUID from "../types/GUID.ts";

/**
 * Generates a random GUID string
 * @returns A random string in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" of type GUID
 */
export default function generateGUID(): GUID {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) as GUID;
}

export const DEFAULT_GUID = "00000000-0000-0000-0000-000000000000" as GUID;