import useAutoStepIDs from "../../hooks/AutoSteps/useAutoStepIDs.ts";
import AutoStepsListItem from "./AutoStepsListItem.tsx";
import AddAutoStepButton from "./buttons/AddAutoStepButton.tsx";

export default function AutoStepsList() {
    const autoStepIDs = useAutoStepIDs();

    return (
        <div>
            {autoStepIDs.map((id) => (
                <AutoStepsListItem
                    autoStepID={id}
                    key={id}
                />
            ))}
            <AddAutoStepButton/>
        </div>
    );
}