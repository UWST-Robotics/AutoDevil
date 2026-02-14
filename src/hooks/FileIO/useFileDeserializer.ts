import {atom, useSetAtom} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import {settingsAtom} from "../Utils/useSettings.ts";
import autoStepTypes from "../../db/AutoStepTypes.tsx";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";

export const fileDeserializerAtom = atom(null, (get, set, fileContent: string) => {

    // Divide File Content
    const lines = fileContent.split("\n");


    // Reset Path
    const autoSteps: AutoStep[] = [];

    lines.forEach(line => {
        // Parse Params
        const params = line.split(" ").splice(1).map(parseFloat);

        // Match Auto Step Type
        const autoStepType = autoStepTypes.find(type => line.startsWith(type.type));
        if (autoStepType)
            autoSteps.push(autoStepType.deserialize(params));
        else
            console.warn(`Unknown Auto Step Type: ${line}`);
    });

    // Set File
    set(autoDataAtom, {steps: autoSteps, occupancyGrid: []});

    // Switch to Path Tab
    const settings = get(settingsAtom);
    set(settingsAtom, {...settings, showOccupancyGrid: false});
});

export default function useFileDeserializer() {
    return useSetAtom(fileDeserializerAtom);
}