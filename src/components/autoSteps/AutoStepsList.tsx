import AutoStepsListItem from "./AutoStepsListItem.tsx";
import AddAutoStepButton from "./buttons/AddAutoStepButton.tsx";
import {ReactSortable} from "react-sortablejs";
import {useAutoSteps} from "../../hooks/AutoData/useAutoSteps.ts";

export default function AutoStepsList() {
    const [autoSteps, setAutoSteps] = useAutoSteps();

    return (
        <>
            <ReactSortable
                list={autoSteps}
                setList={setAutoSteps}

                group={"autoSteps"}
                animation={200}
                delayOnTouchStart={true}
                delay={2}
            >
                {autoSteps.map((autoStep) => (
                    <AutoStepsListItem
                        autoStepID={autoStep.id}
                        key={autoStep.id}
                    />
                ))}
            </ReactSortable>
            <AddAutoStepButton/>
        </>
    );
}