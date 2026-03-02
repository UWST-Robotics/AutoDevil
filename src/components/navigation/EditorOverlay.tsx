import {Box} from "@mui/material";
import TopBar from "./TopBar.tsx";
import LeftSideBar from "./LeftSideBar.tsx";
import RightSideBar from "./RightSideBar.tsx";

export default function EditorOverlay() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                pointerEvents: "none",
                position: "relative",
                zIndex: 100,
            }}
        >
            <TopBar/>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    minHeight: 0,
                    flexGrow: 1,
                }}
            >
                <LeftSideBar/>
                <RightSideBar/>
            </Box>
        </Box>
    )
}