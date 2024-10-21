import {atom, useAtomValue} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";

function formatNumber(num: number) {
    return num.toFixed(3);
}

export const pathEncoderAtom = atom((get) => {
    const path = get(rawAutoDataAtom);

    let fileContent = "PATH 1\n";
    // path.points.forEach((point) => {
    //     fileContent += `POINT ${formatNumber(point.x)} ${formatNumber(point.y)} ${formatNumber(point.r)} ${formatNumber(point.enterDelta)} ${formatNumber(point.exitDelta)}\n`;
    //     point.events?.forEach((event) => {
    //         fileContent += `EVENT ${event.name} ${event.params}\n`;
    //     });
    //     if (point.isReversed)
    //         fileContent += `REVERSE\n`;
    // });

    // TODO: FIX ME

    fileContent += "ENDPATH\n";
    return fileContent;
});

export default function usePathEncoder() {
    return useAtomValue(pathEncoderAtom);
}