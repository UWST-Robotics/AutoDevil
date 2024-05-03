import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import OccupancyTool from "../../types/OccupancyTool.ts";

const DEFAULT_TOOL: OccupancyTool = "Draw";

export const occupancyAtom = atom<OccupancyTool>(DEFAULT_TOOL);

export default function useOccupancyTool() {
    return useAtom(occupancyAtom);
}

export function useSetOccupancyTool() {
    return useSetAtom(occupancyAtom);
}

export function useOccupancyToolValue() {
    return useAtomValue(occupancyAtom);
}