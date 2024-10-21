import AutoStepType from "./AutoStepType.ts";
import GUID from "../GUID.ts";

export default interface AutoStep {
    id: GUID;
    type: AutoStepType;
}