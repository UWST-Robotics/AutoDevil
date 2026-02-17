import {Divider, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useDialogVisible from "../../../hooks/Utils/useDialogVisible.ts";
import GenericModal from "../../common/GenericModal.tsx";

export default function AboutModal() {
    const [isVisible, setVisible] = useDialogVisible("about");

    return (
        <GenericModal
            isOpen={isVisible}
            onClose={() => setVisible(false)}
        >
            <Typography
                variant={"h5"}
                color={"text.primary"}
                style={{fontWeight: "bold"}}
            >
                AutoDevil
            </Typography>
            <Typography
                variant={"body2"}
                color={"text.secondary"}
            >
                Version {APP_VERSION}
            </Typography>
            <IconButton
                aria-label={"Close About"}
                onClick={() => setVisible(false)}
                style={{position: "absolute", top: 20, right: 20}}
            >
                <CloseIcon/>
            </IconButton>
            <Divider orientation={"horizontal"} style={{marginBottom: 8, marginTop: 8}}/>

            <Typography variant={"body2"}>
                Created by UW-Stout's <a href={"https://devilbots.org"}>DevilBots</a><br/>
                Software is under GNU General Public License v3.0<br/>
                Source code available on <a href={"https://github.com/UWST-Robotics/AutoDevil"}>GitHub</a>
            </Typography>
        </GenericModal>
    )
}