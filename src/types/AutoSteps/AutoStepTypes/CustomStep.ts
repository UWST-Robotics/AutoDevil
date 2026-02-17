import {Code} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";

export const DEFAULT_CUSTOM_CODE = "// Custom code goes here";

const CustomCodeStepType: AutoStepType = {
    id: "customCode",
    name: "Custom Code",

    color: "secondary.main",
    backgroundColor: "#33233b",
    icon: Code,

    generateCode: (step) => {
        return [step.customCode ?? DEFAULT_CUSTOM_CODE];
    }
}
export default CustomCodeStepType;