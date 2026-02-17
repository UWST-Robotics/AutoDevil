import GenericModal from "../../common/GenericModal.tsx";
import useDialogVisible from "../../../hooks/Utils/useDialogVisible.ts";
import useOutputCode from "../../../hooks/Code/useOutputCode.tsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/hljs/dark";
import {Paper} from "@mui/material";

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
                style={{marginTop: 10}}
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
        </GenericModal>
    )
}