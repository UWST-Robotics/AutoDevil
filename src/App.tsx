import MainCanvas from "./components/canvas/MainCanvas.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import BottomBar from "./components/navigation/BottomBar.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import RightSideBar from "./components/navigation/RightSideBar.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalHooks />
            <MainCanvas />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            >
                <TopBar />
                <BottomBar />
                <RightSideBar />
            </div>
        </ThemeProvider>
    )
}

export default App
