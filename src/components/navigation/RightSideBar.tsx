import {Paper} from "@mui/material";
import Resizable from "../common/Resizable.tsx";

export default function RightSideBar() {
    return (
        <Resizable
            storageKey={"right-sidebar-width"}
            defaultSize={300}
            minSize={200}
            barLocation={"left"}
        >
            <Paper
                elevation={1}
                square
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 10px",
                    overflowX: "hidden",
                    overflowY: "auto",
                    pointerEvents: "auto",
                    position: "relative",
                    zIndex: -10
                }}
                // onMouseDown={() => setFocus(Scope.Inspector)}
            >
            </Paper>
        </Resizable>
    )

}