import useAutoStepIDs from "../../../hooks/AutoSteps/useAutoStepIDs.ts";
import AutoStepRenderer from "./AutoStepRenderer.tsx";

export default function AutoStepsRenderer() {
    const autoStepIDs = useAutoStepIDs();

    return autoStepIDs.map((id) => (
        <AutoStepRenderer
            id={id}
            key={id}
        />
    ));
}