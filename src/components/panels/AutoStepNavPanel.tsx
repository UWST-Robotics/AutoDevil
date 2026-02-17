import {Box, IconButton} from "@mui/material";
import useDeleteSelectedAutoStep from "../../hooks/AutoSteps/actions/useDeleteSelectedAutoStep.ts";
import {DeleteSharp} from "@mui/icons-material";

export default function AutoStepNavPanel() {
    const deleteSelectedAutoStep = useDeleteSelectedAutoStep();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1,
            }}
        >
            <IconButton
                onClick={deleteSelectedAutoStep}
            >
                <DeleteSharp/>
            </IconButton>
        </Box>
    )
}