import useKeybinds from "../hooks/Utils/useKeybinds.ts";
import useElectronListener from "../hooks/Electron/useElectronListener.ts";

export default function GlobalHooks() {
    useKeybinds();
    useElectronListener();
    return null;
}