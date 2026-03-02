import AutoData from "../../types/AutoData.ts";

/**
 * Serializes the AutoData into a Blob that can be downloaded as a file.
 * @param autoData The AutoData to serialize
 * @return A Blob containing the serialized AutoData
 */
export default function serializeAutoData(autoData: AutoData) {
    const fileContent = JSON.stringify(autoData, null, 2);
    return new Blob([fileContent], {type: "text/plain"});
}