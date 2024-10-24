import {Box, Divider, Fade, IconButton, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useShowAbout} from "../../../hooks/Utils/useAboutModal.ts";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: "none !important"
};

export default function AboutModal() {
    const [isVisible, setVisible] = useShowAbout();

    return (
        <Modal
            open={isVisible}
            onClose={() => setVisible(false)}
        >
            <Fade in={isVisible}>
                <Box sx={modalStyle}>
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
                        Version {APP_VERSION} {electronAPI ? "(Electron)" : "(Web)"}
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
                </Box>
            </Fade>
        </Modal>
    )
}