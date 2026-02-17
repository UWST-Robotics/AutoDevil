import {getDefaultStore} from "jotai";
import {settingsAtom} from "../hooks/Utils/useSettings.ts";
import roundTo from "./roundTo.ts";
import Pose from "../types/Pose.ts";

/**
 * Converts a number to a string with the number of decimal places specified in the settings.
 * @param number - The number to convert to a string
 * @returns The number as a string with the number of decimal places specified in the settings
 */
export default function numberToString(number: number) {
    const settings = getDefaultStore().get(settingsAtom);
    return roundTo(number, settings.numberOfDecimalPlaces).toString();
}

/**
 * Converts a Pose to a string with the number of decimal places specified in the settings.
 * @param pose - The Pose to convert to a string
 * @returns The Pose as a string with the number of decimal places specified in the settings, in the format `{x, y, r}`
 */
export function poseToString(pose: Pose) {
    return `{${numberToString(pose.x)}, ${numberToString(pose.y)}, ${numberToString(pose.r)}}`;
}