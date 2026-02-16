import MainCanvas from "./components/canvas/MainCanvas.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import AboutModal from "./components/navigation/modals/AboutModal.tsx";
import EditorOverlay from "./components/navigation/EditorOverlay.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalHooks/>
            <EditorOverlay/>
            <MainCanvas/>
            <AboutModal/>
        </ThemeProvider>
    )
}

export default App
