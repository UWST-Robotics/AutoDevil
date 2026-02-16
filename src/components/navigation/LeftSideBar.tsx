import AutoStepsList from "../autoSteps/AutoStepsList.tsx";
import {Paper} from "@mui/material";
import Resizable from "../common/Resizable.tsx";
import AddAutoStepButton from "../autoSteps/buttons/AddAutoStepButton.tsx";

export default function LeftSideBar() {
    return (
        <Resizable
            storageKey={"left-sidebar-width"}
            defaultSize={270}
            minSize={220}
            barLocation={"right"}
        >
            <Paper
                elevation={1}
                square
                // onMouseDown={() => setFocus(Scope.SceneGraph)}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 1,
                    pointerEvents: "auto",
                    position: "relative",
                    zIndex: -10
                }}
            >
                <AutoStepsList/>
                <AddAutoStepButton/>
            </Paper>
        </Resizable>
    )

}