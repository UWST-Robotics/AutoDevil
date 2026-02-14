import {SvgIconComponent} from "@mui/icons-material";
import AutoStep from "./AutoStep.ts";

interface AutoStepType {
    id: string;
    name: string;
    color: string;
    icon: SvgIconComponent;
    createNew: () => AutoStep;
}
export default AutoStepType;