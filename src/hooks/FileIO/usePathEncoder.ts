import { atom, useAtomValue } from "jotai";
import { pathPlanAtom } from "../Path/usePathPlan.ts";

function formatNumber(num: number) {
    return num.toFixed(3);
}

export const pathEncoderAtom = atom((get) => {
    const path = get(pathPlanAtom);
    let fileContent = "PATH 1\n";
    path.points.forEach((point) => {
        fileContent += `POINT ${formatNumber(point.x)} ${formatNumber(point.y)} ${formatNumber(point.r)} ${formatNumber(point.enterDelta)} ${formatNumber(point.exitDelta)}\n`;
        point.events?.forEach((event) => {
            fileContent += `EVENT ${event}\n`;
        });
        if (point.isReversed)
            fileContent += `REVERSE\n`;
    });
    fileContent += "ENDPATH\n";
    return fileContent;
});

export default function usePathEncoder() {
    return useAtomValue(pathEncoderAtom);
}