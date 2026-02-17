import {atomFamily} from "jotai/utils";
import {atom, useAtom} from "jotai";

export const dialogVisibleAtomFamily = atomFamily((_id: string) => atom(false));

export default function useDialogVisible(id: string) {
    return useAtom(dialogVisibleAtomFamily(id));
}