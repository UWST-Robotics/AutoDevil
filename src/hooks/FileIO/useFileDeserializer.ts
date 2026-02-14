import {atom, useSetAtom} from "jotai";

export const fileDeserializerAtom = atom(null, (_get, _set, _fileContent: string) => {
    throw new Error("Not yet implemented");
});

export default function useFileDeserializer() {
    return useSetAtom(fileDeserializerAtom);
}