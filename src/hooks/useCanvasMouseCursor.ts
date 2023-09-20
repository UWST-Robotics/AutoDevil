import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const canvasMouseCursorAtom = atom("default");

export function useCanvasMouseCursor() {
    return useAtom(canvasMouseCursorAtom);
}

export default function useCanvasMouseCursorValue() {
    return useAtomValue(canvasMouseCursorAtom);
}

export function useSetCanvasMouseCursor() {
    return useSetAtom(canvasMouseCursorAtom);
}