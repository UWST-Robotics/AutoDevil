import GenericModal from "../../common/GenericModal.tsx";
import useDialogVisible from "../../../hooks/Utils/useDialogVisible.ts";
import useOutputCode from "../../../hooks/Code/useOutputCode.tsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/hljs/dark";
import {Paper} from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton.tsx";
import Callout from "../../common/Callout.tsx";

export default function CodeModal() {
    const [isVisible, setVisible] = useDialogVisible("code");
    const outputCode = useOutputCode();

    return (
        <GenericModal
            title={"Code"}
            isOpen={isVisible}
            onClose={() => setVisible(false)}
            width={800}
        >
            <Paper
                elevation={1}
                style={{
                    marginTop: 10,
                    maxHeight: "50vh",
                    overflowX: "auto",
                }}
            >
                <SyntaxHighlighter
                    language="cpp"
                    style={dark}
                    customStyle={{
                        backgroundColor: "transparent"
                    }}
                >
                    {outputCode}
                </SyntaxHighlighter>
            </Paper>
            <CopyToClipboardButton text={outputCode}/>
            <Callout>
                Generated code is intended to be used as a starting point for an autonomous routine in{" "}
                <a href={"https://docs.devilbots.org/"}>DevilLib</a>.
                You will have to modify and tune the code to fit your specific robot and use case.
            </Callout>
        </GenericModal>
    )
}