import { atom, useSetAtom } from "jotai";
import { rawPathAtom } from "../Path/useRawPath.ts";
import PathPlan from "../../types/PathPlan.ts";
import generateGUID from "../../utils/generateGUID.ts";

export const pathDecoderAtom = atom(null, (_, set, fileContent: string) => {
    const lines = fileContent.split("\n");
    const path: PathPlan = {
        points: [],
    };
    lines.forEach((line) => {
        if (line.startsWith("PATH")) {
            if (line.startsWith("PATH 1"))
                return;
            throw new Error("Only PATH 1 is supported");
        } else if (line.startsWith("POINT")) {
            const [_, x, y, r, enterDelta, exitDelta] = line.split(" ");
            path.points.push({
                id: generateGUID(),
                x: parseFloat(x),
                y: parseFloat(y),
                r: parseFloat(r),
                enterDelta: parseFloat(enterDelta),
                exitDelta: parseFloat(exitDelta),
                events: [],
            });
        } else if (line.startsWith("EVENT")) {
            const [_, event] = line.split(" ");
            path.points[path.points.length - 1].events?.push(event);
        } else if (line.startsWith("REVERSE")) {
            path.points[path.points.length - 1].isReversed = true;
        } else if (line.startsWith("ENDPATH") || line === "") {
            // Ignore
        } else {
            console.warn(`Unknown line: ${line}`);
        }
    });
    set(rawPathAtom, path);
});

export default function usePathDecoder() {
    return useSetAtom(pathDecoderAtom);
}