import {atom, useSetAtom} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";
import {settingsAtom} from "../Utils/useSettings.ts";

export const pathDecoderAtom = atom(null, (get, set, fileContent: string) => {

    // Divide File Content
    const lines = fileContent.split("\n");


    // Reset Path
    const path = get(rawAutoDataAtom);
    // path.points = [];

    // lines.forEach((line) => {
    //     if (line.startsWith("PATH")) {
    //         if (line.startsWith("PATH 1"))
    //             return;
    //         throw new Error("Only PATH 1 is supported");
    //     } else if (line.startsWith("OCCUPANCY")) {
    //         if (line.startsWith("OCCUPANCY 1"))
    //             return;
    //         throw new Error("Only OCCUPANCY 1 is supported");
    //     } else if (line.startsWith("POINT")) {
    //         const [_, x, y, r, enterDelta, exitDelta] = line.split(" ");
    //         path.points.push({
    //             id: generateGUID(),
    //             x: parseFloat(x),
    //             y: parseFloat(y),
    //             r: parseFloat(r),
    //             enterDelta: parseFloat(enterDelta),
    //             exitDelta: parseFloat(exitDelta),
    //             events: [],
    //         });
    //     } else if (line.startsWith("EVENT")) {
    //         const [_, name, params] = line.split(" ");
    //         path.points[path.points.length - 1].events?.push({
    //             id: generateGUID(),
    //             name,
    //             params,
    //         });
    //     } else if (line.startsWith("REVERSE")) {
    //         path.points[path.points.length - 1].isReversed = true;
    //     } else if (line.startsWith("ENDPATH") || line === "") {
    //         // Ignore
    //     } else {
    //         console.warn(`Unknown line: ${line}`);
    //     }
    // });

    // TODO: FIX ME

    // Set File
    set(rawAutoDataAtom, {...path});

    // Switch to Path Tab
    const settings = get(settingsAtom);
    set(settingsAtom, {...settings, showOccupancyGrid: false});
});

export default function usePathDecoder() {
    return useSetAtom(pathDecoderAtom);
}