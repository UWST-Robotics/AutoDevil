import AutoStep from "./AutoStep.ts";

export default interface AutoDriveStep extends AutoStep {
    distance: number;
}