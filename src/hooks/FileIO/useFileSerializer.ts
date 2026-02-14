import {atom, useAtomValue} from "jotai";

export const fileSerializerAtom = atom(() => {
    throw new Error("Not yet implemented");
});

export default function useFileSerializer() {
    return useAtomValue(fileSerializerAtom);
}