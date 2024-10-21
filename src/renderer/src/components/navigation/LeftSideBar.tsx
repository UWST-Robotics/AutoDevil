import AutoStepsList from "../autoSteps/AutoStepsList.tsx";
import TransparentCard from "../util/TransparentCard.tsx";

export default function LeftSideBar() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                width: 200
            }}
        >
            <TransparentCard>
                <AutoStepsList/>
            </TransparentCard>
        </div>
    )

}