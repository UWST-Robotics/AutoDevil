import AutoData from "../../types/AutoData.ts";

/**
 * Deserializes a Blob containing AutoData JSON into an AutoData object.
 * @param data - The Blob containing the AutoData JSON.
 * @return A promise that resolves to the deserialized AutoData object.
 */
export default async function deserializeAutoData(data: Blob) {
    const fileJSON = await data.text();
    const fileData = JSON.parse(fileJSON);
    return fileData as AutoData;
}