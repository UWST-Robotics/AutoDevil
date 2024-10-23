import {atom, useAtomValue} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import getAutoStepInfo from "../../utils/getAutoStepInfo.ts";

function formatNumber(num: number) {
    return num.toFixed(3);
}

export const fileSerializerAtom = atom((get) => {
    const autoData = get(autoDataAtom);

    const fileContent = autoData.steps.map(step => {
        const autoStepInfo = getAutoStepInfo(step.type);
        const params = autoStepInfo?.serialize(step) ?? [];
        return `${step.type} ${params.map(formatNumber).join(" ")}`;
    }).join("\n");

    return fileContent;
});

export default function useFileSerializer() {
    return useAtomValue(fileSerializerAtom);
}