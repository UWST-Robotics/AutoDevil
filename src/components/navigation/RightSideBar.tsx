import {Box} from "@mui/material";
import TransformPanel from "../panels/TransformPanel.tsx";
import PausePanel from "../panels/PausePanel.tsx";
import RotatePanel from "../panels/RotatePanel.tsx";
import CustomCodePanel from "../panels/CustomCodePanel.tsx";

export default function RightSideBar() {
    return (
        <Box
            sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                padding: "0 10px",
                overflowX: "hidden",
                overflowY: "auto",
                position: "relative",
                zIndex: -10,
            }}
            // onMouseDown={() => setFocus(Scope.Inspector)}
        >
            <TransformPanel/>
            <PausePanel/>
            <RotatePanel/>
            <CustomCodePanel/>
        </Box>
    )

}