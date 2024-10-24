import useAutoStepIDs from "../../../hooks/AutoSteps/useAutoStepIDs.ts";
import {Group} from "react-konva";
import PathSegmentRenderer from "./PathSegmentRenderer.tsx";

export default function PathRenderer() {
    const autoStepIDs = useAutoStepIDs();

    return (
        <Group>
            {autoStepIDs.map((autoStepID) => (
                <PathSegmentRenderer
                    key={autoStepID}
                    autoStepID={autoStepID}
                />
            ))}
        </Group>
    )
}